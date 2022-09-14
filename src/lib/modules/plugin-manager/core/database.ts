import Database from 'tauri-plugin-sqlite-api';
import type SQLite from 'tauri-plugin-sqlite-api';
import { fs, path } from '@tauri-apps/api';
import type { Document } from '$lib/models';
import { nanoid } from 'nanoid';
import { PluginProvider } from '..';

const DB_FILE = 'gozhtet.db';

export class DatabaseProvider extends PluginProvider {
  db: SQLite | null;

  sidebar = {
    label: {
      ru: 'Блокнот',
      en: 'Notes',
    },
    icon: '',
    onAddNewDocument: this.addNewDocument.bind(this),
  };

  private recordToDocument(record: Record<string, string> | Document): Document {
    return {
      id: record.id,
      name: (record.content || '').trim().split(/\n/)[0] || '',
      content: record.content,
    };
  }

  async onInit() {
    this.db = await Promise.resolve()
      .then(() => path.appDir())
      .then(async (appDir) => {
        await fs.createDir(appDir).catch((_err) => {
          // console.error('Error if create app path', _err);
        });
        return appDir;
      })
      .then((appDir) => `${appDir}${DB_FILE}`)
      .then((path) => Database.open(path));

    await this.db.execute(SEED);

    const res = await this.db.select(`select * from documents`);
    const docs = Array.from(res as Record<string, string>[]).map<Document>(this.recordToDocument);

    this.documents.update((_) => {
      return docs;
    });
  }

  async addNewDocument() {
    const id = nanoid();

    await this.db.execute(
      `
      INSERT INTO documents (id, content)
      VALUES ($1, $2);
    `,
      [id, '']
    );
    const res = await this.db.select(`select * from documents where id = $1`, [id]);
    const [doc] = res as never[];
    this.documents.update((state) => {
      state.push(this.recordToDocument(doc));
      return state;
    });
  }

  async onUpdateDocument(doc: Document) {
    if (!this.db) {
      return;
    }

    const document = this.recordToDocument(doc);
    await this.db.execute(`UPDATE documents SET content = $1 WHERE id = $2`, [document.content, document.id]);

    super.onUpdateDocument(document);
  }
}

const SEED = `
CREATE TABLE IF NOT EXISTS documents (
  id VARCHAR(200) NOT NULL PRIMARY KEY,
  content TEXT
);
`;
