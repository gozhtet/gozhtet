#[cfg(target_os = "macos")]
pub mod macos;

use self::macos::ToolbarThickness;
use tauri::Window as TauriWindow;

pub trait PatchWindow {
    #[cfg(target_os = "macos")]
    fn apply_toolbar(&self, tickness: ToolbarThickness);

    #[cfg(target_os = "macos")]
    fn apply_fix_blur(&self);
}

impl PatchWindow for TauriWindow {
    #[cfg(target_os = "macos")]
    fn apply_fix_blur(&self) {
        macos::apply_fix_blur(self.ns_window().unwrap() as _);
    }

    #[cfg(target_os = "macos")]
    fn apply_toolbar(&self, tickness: ToolbarThickness) {
        macos::apply_toolbar(self, tickness);
    }
}
