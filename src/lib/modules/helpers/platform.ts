import { os } from "@tauri-apps/api";
export const getPlatform = () => os.platform();
