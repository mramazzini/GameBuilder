import windowListener from "./window";
import globalListener from "./global";
import titleBarListener from "./titleBar";
import mapListener from "./mapEditor";

import { BrowserWindow, IpcMain } from "electron";

function initListeners(
  ipcMain: IpcMain,
  win: BrowserWindow | null,
  VITE_DEV_SERVER_URL: any,
  dialog: any
) {
  globalListener(win, dialog, ipcMain);
  mapListener(ipcMain);
  windowListener(ipcMain, win, VITE_DEV_SERVER_URL);
  titleBarListener(ipcMain);
}

export default initListeners;
