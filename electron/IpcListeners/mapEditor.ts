import { getMapInfo, getTilesetInfo } from "./helpers";
import fs from "fs";
import path from "path";
import { Map, MapLayer } from "../../src/utils/types";

const mapListener = (ipcMain: any) => {
  ipcMain.on("get-map-info", function (event: any, projectDirectory: string) {
    try {
      console.log(
        "Received map-info message with project directory:",
        projectDirectory
      );

      const mapInfo = getMapInfo(projectDirectory);
      event.sender.send("map-info", mapInfo);
    } catch (err) {
      console.error(err);
      event.sender.send("error", `Error getting map info ${err}`);
    }
  });

  ipcMain.on(
    "get-tileset-info",
    function (event: any, projectDirectory: string) {
      try {
        console.log(
          "Received tileset-info message with project directory:",
          projectDirectory
        );

        const tileinfo = getTilesetInfo(projectDirectory);

        event.sender.send("tileset-info", tileinfo);
      } catch (err) {
        console.error(err);
        event.sender.send("error", `Error getting tileset info ${err}`);
      }
    }
  );

  ipcMain.on("save-map", function (event: any, payload: any) {
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
  ipcMain.on("delete-map", function (event: any, payload: any) {
    try {
      console.log("Received delete-map message with map:", payload.map);

      const mapPath = path.join(
        payload.projectDirectory,
        "maps",
        "map_" + payload.map + ".json"
      );
      fs.unlinkSync(mapPath);

      event.sender.send("map-deleted");
    } catch (err) {
      console.error(err);
      event.sender.send("error", `Error deleting map ${err}`);
    }
  });
  ipcMain.on("create-map", function (event: any, payload: any) {
    try {
      console.log("Received create-map message with map:", payload.map);

      const layers: MapLayer[] = [
        { tag: "background", tiles: [] },
        { tag: "foreground", tiles: [] },
        { tag: "preground", tiles: [] },
      ];

      for (let i = 0; i < payload.map.sizeX; i++) {
        const row = [];
        for (let j = 0; j < payload.map.sizeY; j++) {
          const tile = {
            collider: false,
            srcX: -1,
            srcY: -1,
          };
          row.push(tile);
        }
        layers[0].tiles.push(row);
        layers[1].tiles.push(row);
        layers[2].tiles.push(row);
      }

      const newMap: Map = {
        sizeX: payload.map.sizeX,
        sizeY: payload.map.sizeY,
        tag: payload.map.tag,
        layers: layers,
        tileset: payload.map.tileset,
      };

      const mapPath = path.join(
        payload.projectDirectory,
        "maps",
        "map_" + payload.map.tag + ".json"
      );
      const mapData = JSON.stringify(newMap, null, 2);
      fs.writeFileSync(mapPath, mapData);
      console.log(newMap);
      event.sender.send("map-created", newMap);
    } catch (err) {
      console.error(err);
      event.sender.send("error", `Error creating map ${err}`);
    }
  });
};

export default mapListener;
