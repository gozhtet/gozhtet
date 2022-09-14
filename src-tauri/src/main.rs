#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod patch_window;

#[cfg(target_os = "macos")]
use crate::patch_window::{macos::ToolbarThickness, PatchWindow};

use tauri::Manager;
use window_vibrancy::{apply_blur, apply_vibrancy, NSVisualEffectMaterial};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();

            #[cfg(target_os = "macos")]
            {
                window.apply_toolbar(ToolbarThickness::Medium);
                window.apply_fix_blur();
                apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow)
                    .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");
            }

            #[cfg(target_os = "windows")]
            apply_blur(&window, Some((18, 18, 18, 125)))
                .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

            Ok(())
        })
        .plugin(tauri_plugin_sqlite::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
