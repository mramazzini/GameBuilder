import { getMapInfo, getTilesetInfo } from "./helpers";
import fs from "fs";
import path from "path";

const tileSetListener = (ipcMain: any) => {
  ipcMain.on("save-tileset", function (event: any, payload: any) {
    try {
      console.log(
        "Received save-map message with tileset:",
        payload.tileset.tag
      );

      const projectDirectory = payload.projectDirectory;
      const tileSet = payload.tileset;

      const tilesetPath = path.join(
        projectDirectory,
        "relationships",
        "tilesets.json"
      );

      //open json file, find tileset by tag, and replace it
      //if tileset doesn't exist, add it
      const tilesetFile = fs.readFileSync(tilesetPath, "utf8");
      const tilesetJson = JSON.parse(tilesetFile);
      console.log(tilesetFile, tilesetJson[0]);
      const tilesetIndex = tilesetJson.findIndex(
        (t: any) => t.tag === tileSet.tag
      );
      if (tilesetIndex === -1) {
        tilesetJson.push(tileSet);
      } else {
        tilesetJson[tilesetIndex] = tileSet;
      }

      const tilesetData = JSON.stringify(tilesetJson, null, 2);
      fs.writeFileSync(tilesetPath, tilesetData);

      //create png from base64

      const base64Data = tileSet.base64.replace(/^data:image\/png;base64,/, "");
      const binaryData = Buffer.from(base64Data, "base64");
      fs.writeFileSync(
        path.join(
          projectDirectory,
          "tilesets",
          "tileset_" + tileSet.tag + ".png"
        ),
        binaryData
      );

      event.sender.send("tileset-saved");
    } catch (err) {
      console.error(err);
      event.sender.send("error", `Error saving tileset ${err}`);
    }
  });
};

export default tileSetListener;
