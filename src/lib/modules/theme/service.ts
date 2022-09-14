import { rgba } from 'polished';
import type { Readable } from 'svelte/store';
import type { Theme } from '.';

export class ThemeService {
  private static createThemeStyles(theme: Theme): string {
    return `
      :root {
        --base-primary: ${theme.colors.primary};
        --base-primary24: ${rgba(theme.colors.primary, 0.24)};
        --base-primary12: ${rgba(theme.colors.primary, 0.12)};
  
        --base-panel: ${theme.colors.panel};
        --base-border: ${theme.colors.border};
        --base-overlay: ${theme.colors.overlay};
  
        --base-background: ${theme.colors.background};
  
        --base-text: ${theme.colors.text};
        --base-title: ${theme.colors.title};
        --base-subtitle: ${theme.colors.subtitle};
  
        --base-red: ${theme.colors.red};
  
        --base-shadow: ${theme.vars.shadow};
        --base-transition: ${theme.vars.transition};
  
        --border-radius: ${theme.vars.borderRadius}px;
      }
    `;
  }

  static init(currentTheme: Readable<Theme>) {
    const styles = document.createElement('style');
    document.head.appendChild(styles);
    const unsubscribe = currentTheme.subscribe((theme) => {
      styles.innerHTML = this.createThemeStyles(theme);
    });

    return () => {
      styles.remove();
      unsubscribe();
    };
  }
}
