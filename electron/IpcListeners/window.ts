import { BrowserWindow, IpcMain } from "electron";
import path from "node:path";
import { app } from "electron";
const windowListener = (
  ipcMain: IpcMain,
  win: BrowserWindow | null,
  VITE_DEV_SERVER_URL: any
) => {
  function createWindow() {
    win = new BrowserWindow({
      icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        nodeIntegration: true,
      },
      titleBarStyle: "hidden",
      frame: false,
      minWidth: 500, // Set the minimum width
      minHeight: 400, // Set the minimum height
    });

    // Test active push message to Renderer-process.
    win.webContents.on("did-finish-load", () => {
      win?.webContents.send(
        "main-process-message",
        new Date().toLocaleString()
      );
    });

    if (VITE_DEV_SERVER_URL) {
      win.loadURL(VITE_DEV_SERVER_URL);
    } else {
      // win.loadFile('dist/index.html')
      win.loadFile(path.join(process.env.DIST, "index.html"));

      ipcMain.on("maximize-window", () => {
        if (win?.isMaximized()) {
          win.restore();
        } else {
          win?.maximize();
        }
      });
    }
  }
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
      win = null;
    }
  });

  app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.whenReady().then(createWindow);
};

export default windowListener;
