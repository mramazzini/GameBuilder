import { getFilesAndFolders } from "./helpers";
import { getMapInfo, getTilesetInfo } from "./helpers";
import fs from "fs";
import path from "path";
const globalListener = (win: any, dialog: any, ipcMain: any) => {
  ipcMain.on("select-project", function (event: any) {
    dialog
      .showOpenDialog(win, {
        properties: ["openDirectory"],
      })
      .then((result: any) => {
        if (!result.canceled) {
          const selectedFolderPath = result.filePaths[0];
          const filesAndFolders = getFilesAndFolders(
            selectedFolderPath,
            0,
            event
          );

          event.sender.send("selected-project", {
            selectedFolderPath,
            filesAndFolders,
          });
        }
      })
      .catch((err: any) => {
        event.sender.send("error", err);
      });
  });

  ipcMain.on(
    "refresh-project",
    function (event: any, projectDirectory: string) {
      try {
        console.log(
          "Received refresh-project message with project directory:",
          projectDirectory
        );
        console.log(projectDirectory);
        const filesAndFolders = getFilesAndFolders(projectDirectory, 0, event);
        const mapInfo = getMapInfo(projectDirectory);
        const tilesetInfo = getTilesetInfo(projectDirectory);
        const payload = {
          filesAndFolders,
          mapInfo,
          tilesetInfo,
        };

        event.sender.send("project-refreshed", payload);
      } catch (err) {
        console.error(err);
        event.sender.send("error", `Error refreshing project ${err}`);
      }
    }
  );

  ipcMain.on("create-folders", function (event: any) {
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
        .then((result: any) => {
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
        .catch((err: any) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
      event.sender.send("error", `Error creating folders ${err}`);
    }
  });
};
export default globalListener;
