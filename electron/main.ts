const { app, BrowserWindow, dialog } = require("electron");

import { ipcMain } from "electron";
import path from "node:path";
const fs = require("fs");

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: any;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
    titleBarStyle: "hidden",
    frame: false,
    minWidth: 400, // Set the minimum width
    minHeight: 300, // Set the minimum height
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
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

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
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

ipcMain.on("open-folder-dialog", function (event) {
  dialog
    .showOpenDialog(win, {
      properties: ["openDirectory"],
    })
    .then((result) => {
      if (!result.canceled) {
        const selectedFolderPath = result.filePaths[0];
        const filesAndFolders = getFilesAndFolders(selectedFolderPath);
        event.sender.send("selected-folder", filesAndFolders);
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

interface FileOrFolder {
  name: string;
  type: "file" | "folder";
  children: FileOrFolder[];
}

function getFilesAndFolders(folderPath: string) {
  const filesAndFolders: FileOrFolder = {
    name: path.basename(folderPath),
    type: "folder",
    children: [],
  };

  const items = fs.readdirSync(folderPath);

  items.forEach((item: any) => {
    const itemPath = path.join(folderPath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      // Recursively add subfolders
      const subfolder = getFilesAndFolders(itemPath);
      filesAndFolders.children.push(subfolder);
    } else {
      // Add files
      filesAndFolders.children.push({
        name: item,
        type: "file",
        children: [],
      });
    }
  });

  return filesAndFolders;
}

app.whenReady().then(createWindow);
