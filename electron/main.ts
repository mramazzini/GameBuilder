const { app, BrowserWindow, dialog } = require("electron");

import { ipcMain } from "electron";
import path from "node:path";
const fs = require("fs");
const { spawn } = require("child_process");
const readline = require("readline");

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
    minWidth: 500, // Set the minimum width
    minHeight: 400, // Set the minimum height
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
        event.sender.send("selected-folder", {
          selectedFolderPath,
          filesAndFolders,
        });
      }
    })
    .catch((err) => {
      event.sender.send("error", "Error opening folder");
    });
});

ipcMain.on("initialize-engine", function (event, projectDirectory: string) {
  try {
    console.log(
      "Received initialize-engine message with project directory:",
      projectDirectory
    );
    const appPath = app.getAppPath();
    const enginePath = path.join(
      appPath,
      "..",
      "..",
      "Engine",
      "GameC++",
      "build",
      "main.exe"
    );

    const args = [projectDirectory];

    // Modify spawn options to capture stdout and stderr
    const engineProcess = spawn(enginePath, args, {
      detached: true,
      stdio: ["ignore", "pipe", "pipe"], // stdin, stdout, stderr
    });

    // Listen for data events on stdout and stderr
    engineProcess.stdout.on("data", (data: string) => {
      console.log(`Engine stdout: ${data}`);
      event.sender.send("engine-stdout", data);
      // You can send this data to the renderer process if needed
    });

    engineProcess.stderr.on("data", (data: string) => {
      console.error(`Engine stderr: ${data}`);
      event.sender.send("engine-stderr", data);
      // You can send this data to the renderer process if needed
    });

    // Handle process exit
    engineProcess.on("exit", (code: string) => {
      console.log(`Engine process exited with code ${code}`);
      event.sender.send("engine-exit", code);
    });

    // Make sure to unref both stdout and stderr to allow the app to exit
    engineProcess.stdout.unref();
    engineProcess.stderr.unref();

    event.sender.send("engine-initialized");
  } catch (err) {
    console.error(err);
    event.sender.send("error", "Error initializing engine");
  }
});

ipcMain.on("get-map-info", function (event, projectDirectory: string) {
  try {
    console.log(
      "Received map-info message with project directory:",
      projectDirectory
    );

    // loop through maps folder and get map info
    const mapsFolder = path.join(projectDirectory, "maps");
    const mapFiles = fs.readdirSync(mapsFolder);
    const maps: any[] = [];
    mapFiles.forEach((mapFile: string) => {
      const mapPath = path.join(mapsFolder, mapFile);
      const mapData = fs.readFileSync(mapPath, "utf8");
      const map = JSON.parse(mapData);
      maps.push(map);
    });
    event.sender.send("map-info", maps);
  } catch (err) {
    console.error(err);
    event.sender.send("error", "Error getting map info");
  }
});

ipcMain.on("create-folders", function (event) {
  const foldersToCreate = [
    "animation",
    "relationships",
    "hitboxes",
    "maps",
    "images",
    "sounds",
    "tilesets",
  ];

  try {
    dialog
      .showOpenDialog(win, {
        properties: ["openDirectory"],
      })
      .then((result) => {
        if (!result.canceled) {
          //check if folder is empty
          if (fs.readdirSync(result.filePaths[0]).length > 0) {
            event.sender.send(
              "error",
              "Folder is not empty. Please select an empty folder or load an existing Project."
            );
            return;
          }
          const selectedFolderPath = result.filePaths[0];
          //create subfolders here
          foldersToCreate.forEach((folder) => {
            fs.mkdirSync(path.join(selectedFolderPath, folder));
          });
          const filesAndFolders = getFilesAndFolders(selectedFolderPath);
          event.sender.send("selected-folder", {
            selectedFolderPath,
            filesAndFolders,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    console.error(err);
    event.sender.send("error", "Error creating folders");
  }
});

interface FileOrFolder {
  name: string;
  isFolder: boolean;
  children: FileOrFolder[];
}

function getFilesAndFolders(folderPath: string) {
  const filesAndFolders: FileOrFolder = {
    name: path.basename(folderPath),
    isFolder: true,
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
        isFolder: false,
        children: [],
      });
    }
  });

  return filesAndFolders;
}

app.whenReady().then(createWindow);
