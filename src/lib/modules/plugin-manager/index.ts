import type { Document } from '$lib/models';
import { app, fs, path } from '@tauri-apps/api';
import { writable } from 'svelte/store';
import * as tauri from '@tauri-apps/api';

import axios from 'axios';
import axiosTauriApiAdapter from 'axios-tauri-api-adapter';
import { Logger } from '$lib/helpers/logger';

const axiosOverTauri = axios.create({ adapter: axiosTauriApiAdapter });

export class PluginProvider {
  sidebar?: {
    label: string | Record<string, string>;
    onAddNewDocument?: () => void;
  };

  documents = writable([] as Array<Document>);

  onInit() {}

  onUpdateDocument(document: Document) {
    this.documents.update((state) => {
      return state.map((doc) => (doc.id === document.id ? document : doc));
    });
  }
}

export type Plugin = {
  name: string;
  provider: PluginProvider;
};

type BasePlugin = Plugin & {
  internal?: boolean;
};

export class PluginManager {
  plugins: Set<BasePlugin> = new Set();

  constructor() {}

  registerPlugin(plugin: BasePlugin) {
    this.plugins.add(plugin);
  }

  getPlugins() {
    return Array.from(this.plugins);
  }

  public async initDir() {
    const appDir = await path.appDir();
    const dir = await path.join(appDir, 'plugins');
    fs.createDir(dir, { recursive: true }).catch((err) => {
      console.log(err);
    });

    return dir;
  }

  public async readCustomPlugins(dir: string) {
    try {
      const plugins = await fs.readDir(dir);

      const packageJsons = (
        await Promise.all(
          plugins
            .filter((item) => item.children)
            .map(async (item) => {
              const files = await fs.readDir(item.path);
              const file = files.find((item) => item.name === 'package.json');
              if (file) {
                try {
                  return {
                    name: item.name,
                    path: item.path,
                    package_json: JSON.parse(await fs.readTextFile(file.path)),
                  };
                } catch (err) {
                  return null;
                }
              }
            })
        )
      ).filter((item) => item);

      const entries = await Promise.all(
        packageJsons.map(async (pkg) => {
          try {
            if (pkg.package_json.main) {
              return {
                name: pkg.package_json.name || pkg.name,
                file: await fs.readTextFile(await path.join(pkg.path, pkg.package_json.main)),
              };
            }
          } catch (err) {
            Logger.error(err);
            return null;
          }
        })
      );

      const pluginPayload = {
        fetch: axiosOverTauri,
        platform: tauri.os.platform,
        shell: tauri.shell,
        notification: {
          show: tauri.notification.sendNotification,
        },
        clipboard: tauri.clipboard,
        dialog: tauri.dialog,
        // registerTheme: (theme: Theme) => {
        //   theme$.setTheme(theme);
        // }
      };

      await Promise.all(
        entries.map(async (entry) => {
          const blob = URL.createObjectURL(new Blob([entry.file], { type: 'text/javascript' }));
          await import(/* @vite-ignore */ blob).then((pluginModule) => {
            if (pluginModule.register) {
              const result = pluginModule.register(pluginPayload);
              this.registerPlugin({
                name: entry.name,
                provider: result,
                internal: false,
              });
            }
          });
        })
      );
    } catch (err) {
      Logger.error(err);
    }
  }
}
