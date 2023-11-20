import fs from "fs";
import path from "node:path";

interface FileOrFolder {
  name: string;
  isFolder: boolean;
  children: FileOrFolder[];
}

export const getFilesAndFolders = (
  folderPath: string,
  index: number,
  event: any
) => {
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
};
export const getTilesetInfo = (projectDirectory: string) => {
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
  return relationships;
};

export const getMapInfo = (projectDirectory: string) => {
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

  return maps;
};

export const convertImageToBase64 = (filePath: string) => {
  // Read the PNG file as a binary buffer
  const buffer = fs.readFileSync(filePath);

  // Convert the binary buffer to base64
  const base64Data = buffer.toString("base64");

  return base64Data;
};
