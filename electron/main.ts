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
        const filesAndFolders = getFilesAndFolders(
          selectedFolderPath,
          0,
          event
        );

        event.sender.send("selected-folder", {
          selectedFolderPath,
          filesAndFolders,
        });
      }
    })
    .catch((err) => {
      event.sender.send("error", err);
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
    event.sender.send("error", `Error initializing engine: ${err}`);
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
    event.sender.send("error", `Error getting map info ${err}`);
  }
});

ipcMain.on("get-tileset-info", function (event, projectDirectory: string) {
  try {
    console.log(
      "Received tileset-info message with project directory:",
      projectDirectory
    );

    // go to relationships/tilesets.json and get tileset info
    const relationshipsFolder = path.join(projectDirectory, "relationships");
    const relationshipsFile = path.join(relationshipsFolder, "tilesets.json");
    const relationshipsData = fs.readFileSync(relationshipsFile, "utf8");
    const relationships = JSON.parse(relationshipsData);
    //calculate base64 for each tileset image
    relationships.forEach((tileset: any) => {
      const tilesetPath = path.join(
        projectDirectory,
        "tilesets",
        "tileset_" + tileset.tag + ".png"
      );
      tileset.base64 = convertImageToBase64(tilesetPath);
    });

    event.sender.send("tileset-info", relationships);
  } catch (err) {
    console.error(err);
    event.sender.send("error", `Error getting tileset info ${err}`);
  }
});

ipcMain.on("save-map", function (event, payload: any) {
  try {
    console.log("Received save-map message with map:", payload.map);

    const newMap = {
      ...payload.map,
      tileset: payload.tileSet.tag,
    };

    const mapPath = path.join(
      payload.projectDirectory,
      "maps",
      "map_" + payload.map.tag + ".json"
    );
    const mapData = JSON.stringify(newMap, null, 2);
    fs.writeFileSync(mapPath, mapData);

    event.sender.send("map-saved");
  } catch (err) {
    console.error(err);
    event.sender.send("error", `Error saving map ${err}`);
  }
});

ipcMain.on("create-folders", function (event) {
  const foldersToCreate = [
    "animations",
    "relationships",

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
          const filesAndFolders = getFilesAndFolders(
            selectedFolderPath,
            0,
            event
          );
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
    event.sender.send("error", `Error creating folders ${err}`);
  }
});

interface FileOrFolder {
  name: string;
  isFolder: boolean;
  children: FileOrFolder[];
}

function getFilesAndFolders(folderPath: string, index: number, event: any) {
  const filesAndFolders: FileOrFolder = {
    name: path.basename(folderPath),
    isFolder: true,
    children: [],
  };

  const items = fs.readdirSync(folderPath);

  if (index === 0) {
    // check to see if valid project folder
    const foldersToCheck = [
      "animations",
      "relationships",
      "maps",
      "images",
      "sounds",
      "tilesets",
    ];
    let validProject = true;
    foldersToCheck.forEach((folder) => {
      if (!items.includes(folder)) {
        validProject = false;
      }
    });
    if (!validProject) {
      event.sender.send(
        "error",
        "Selected folder is not a valid project folder. Please select a valid project folder or create a new Project."
      );
      return filesAndFolders;
    }
  }

  items.forEach((item: any) => {
    const itemPath = path.join(folderPath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      // Recursively add subfolders
      const subfolder = getFilesAndFolders(itemPath, index + 1, event);
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
function convertImageToBase64(filePath: string) {
  // Read the PNG file as a binary buffer
  const buffer = fs.readFileSync(filePath);

  // Convert the binary buffer to base64
  const base64Data = buffer.toString("base64");

  return base64Data;
}

app.whenReady().then(createWindow);
