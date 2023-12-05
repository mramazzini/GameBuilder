import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
const initialState: ProjectState = {
  projectDirectory: "",
  error: "",
  stdLog: [],
  tilesets: [],
  tilesetPixelData: [],
  maps: [],
  filesAndFolders: {
    name: "",
    isFolder: true,
    children: [],
  },
  history: {
    maps: [],
  },

  fileExplorerOpened: true,
  //default colors
  colors: [
    { r: 0, g: 0, b: 0, a: 1 }, //black
    { r: 255, g: 255, b: 255, a: 1 }, //white
    { r: 255, g: 0, b: 0, a: 1 }, //red
    { r: 0, g: 255, b: 0, a: 1 }, //green
    { r: 0, g: 0, b: 255, a: 1 }, //blue
    { r: 255, g: 255, b: 0, a: 1 }, //yellow
    { r: 255, g: 0, b: 255, a: 1 }, //magenta
    { r: 0, g: 255, b: 255, a: 1 }, //cyan
  ],
};

import { getCurrentTime, getMapInfo } from "../../helpers";
import {
  FileOrFolder,
  Map,
  ProjectState,
  RGBA,
  Tile,
  Tileset,
  log,
} from "../../types";

export const GlobalSlice = createSlice({
  name: "Global",
  initialState,

  reducers: {
    toggleFileExplorer: (state) => {
      state.fileExplorerOpened = !state.fileExplorerOpened;
    },
    setProjectDirectory: (state, action: PayloadAction<string>) => {
      document.title = action.payload.split("\\").pop() || "";
      state.projectDirectory = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    addSTDToLog: (state, action: PayloadAction<string>) => {
      //stop repeating messages
      if (state.stdLog.length > 0) {
        const lastLogEntry = state.stdLog[state.stdLog.length - 1];
        if (lastLogEntry.message === action.payload) {
          return;
        }
      }

      //create new object with timestamp
      const newLogEntry = {
        timestamp: getCurrentTime(),
        message: action.payload,
      };

      state.stdLog.push(newLogEntry);
    },
    setFilesAndFolders: (state, action: PayloadAction<FileOrFolder>) => {
      getMapInfo(state.projectDirectory);
      state.filesAndFolders = action.payload;
    },
    refreshProject: (state, action: PayloadAction<FileOrFolder>) => {
      getMapInfo(state.projectDirectory);
      state.filesAndFolders = action.payload;
    },
    setMapInfo: (state, action: PayloadAction<Map[]>) => {
      state.maps = action.payload;
    },
    setTilesetInfo: (state, action: PayloadAction<Tileset[]>) => {
      action.payload.map((tileset: any) => {
        tileset.path = "tileset_" + tileset.tag + ".png";
      });
      state.tilesets = action.payload;
    },
    addToMapHistory: (
      state,
      action: PayloadAction<{
        mapTag: string;
        tile: Tile;
        tilePosition: any;
        layer: number;
      }>
    ) => {
      const mapTag = action.payload.mapTag;
      const mapIndex = state.history.maps.findIndex(
        (map: any) => map.mapTag === mapTag
      );

      //if not, add it
      if (mapIndex === -1) {
        const newMap = {
          mapTag: action.payload.mapTag,
          current: [
            {
              tile: action.payload.tile,
              tilePosition: action.payload.tilePosition,
              layer: action.payload.layer,
            },
          ],
          removed: [],
        };
        state.history.maps.push(newMap);
        return;
      }

      //check if repeat tile
      const currentMap = state.history.maps[mapIndex];
      const currentTile = currentMap.current[currentMap.current.length - 1];
      if (currentTile) {
        if (
          currentTile.tilePosition[0] === action.payload.tilePosition[0] &&
          currentTile.tilePosition[1] === action.payload.tilePosition[1] &&
          currentTile.tile.srcX === action.payload.tile.srcX &&
          currentTile.tile.srcY === action.payload.tile.srcY
        ) {
          return;
        }
      }

      const newMaps = state.history.maps;
      newMaps[mapIndex].current.push({
        tile: action.payload.tile,
        tilePosition: action.payload.tilePosition,
        layer: action.payload.layer,
      });

      state.history.maps = newMaps;
    },
    popFromMapUndoHistory: (state, action: PayloadAction<string>) => {
      const mapTag = action.payload;
      if (!mapTag) {
        return;
      }
      const mapHistoryIndex = state.history.maps.findIndex(
        (map: any) => map.mapTag === mapTag
      );
      if (mapHistoryIndex === -1) {
        return;
      }
      console.log("POP_FROM_MAP_UNDO_HISTORY");
      const newMapsHistory = state.history.maps;
      console.log(newMapsHistory[mapHistoryIndex]);

      const oldTile = newMapsHistory[mapHistoryIndex].removed.pop();
      if (!oldTile) {
        return;
      }
      newMapsHistory[mapHistoryIndex].current.push(oldTile as any);
      console.log(newMapsHistory[mapHistoryIndex]);
      //update maps in state

      const mapObjectIndex = state.maps.findIndex(
        (map: any) => map.tag === mapTag
      );

      const newMapObject = {
        ...state.maps[mapObjectIndex],
      };

      newMapObject.layers[oldTile.layer].tiles[oldTile.tilePosition[0]][
        oldTile.tilePosition[1]
      ] = {
        ...oldTile.tile,
      };

      const newMaps = state.maps;

      newMaps[mapObjectIndex] = newMapObject;

      return {
        ...state,
        maps: newMaps,
        history: {
          ...state.history,
          maps: newMapsHistory,
        },
      };
    },
    popFromMapHistory: (state, action) => {
      const mapTag = action.payload.tag;
      const selectedLayer = action.payload.layer;
      if (!mapTag) {
        return;
      }
      const mapHistoryIndex = state.history.maps.findIndex(
        (map: any) => map.mapTag === mapTag
      );
      if (mapHistoryIndex === -1) {
        return;
      }

      console.log(state.history.maps[mapHistoryIndex]);

      const oldTile = state.history.maps[mapHistoryIndex].current.pop();
      if (!oldTile) {
        return;
      }
      state.history.maps[mapHistoryIndex].removed.push(oldTile as any);
      console.log(state.history.maps[mapHistoryIndex]);
      //update maps in state

      const mapObjectIndex = state.maps.findIndex(
        (map: any) => map.tag === mapTag
      );

      state.maps[mapObjectIndex].layers[oldTile.layer].tiles[
        oldTile.tilePosition[0]
      ][oldTile.tilePosition[1]] = {
        ...oldTile.tile,
      };
    },
    clearRemovedMapHistory: (state, action: PayloadAction<string>) => {
      const mapTag = action.payload;
      if (!mapTag) {
        return;
      }
      const mapHistoryIndex = state.history.maps.findIndex(
        (map: any) => map.mapTag === mapTag
      );
      if (mapHistoryIndex === -1) {
        return;
      }

      state.history.maps[mapHistoryIndex].removed = [];
    },
    runCommand: (state, action: PayloadAction<string>) => {
      //stop repeating messages
      if (state.stdLog.length > 0) {
        const lastLogEntry = state.stdLog[state.stdLog.length - 1];
        if (lastLogEntry.message === action.payload) {
          return;
        }
      }

      //create new object with timestamp
      const newLogEntry = {
        timestamp: getCurrentTime(),
        message: action.payload,
      };

      state.stdLog.push(newLogEntry);
    },
    addColor: (state, action: PayloadAction<RGBA>) => {
      //check for duplicates
      const colorIndex = state.colors.findIndex((color: RGBA) => {
        return (
          color.r === action.payload.r &&
          color.g === action.payload.g &&
          color.b === action.payload.b &&
          color.a === action.payload.a
        );
      });
      if (colorIndex !== -1) {
        return;
      }

      state.colors.push(action.payload);
    },
    removeColor: (state, action: PayloadAction<RGBA>) => {
      state.colors = state.colors.filter((color: RGBA) => {
        return (
          color.r !== action.payload.r &&
          color.g !== action.payload.g &&
          color.b !== action.payload.b &&
          color.a !== action.payload.a
        );
      });
    },

    addTileToTileset: (state, action: PayloadAction<string>) => {
      const tilesetTag = action.payload;

      const tilesetIndex = state.tilesets.findIndex(
        (tilesetObject: Tileset) => tilesetObject.tag === tilesetTag
      );
      if (tilesetIndex === -1) {
        return;
      }
      const tileset = state.tilesets[tilesetIndex];
      let rows = tileset.rows;
      let columns = tileset.columns;
      if (tileset.tileCount + 1 >= 10) {
        rows = Math.ceil(tileset.tileCount / 10);
        columns = 10;
      } else {
        columns = tileset.tileCount;
        rows = 1;
      }

      //calculate base64 image

      const newTileset = {
        ...state.tilesets[tilesetIndex],
        tileCount: state.tilesets[tilesetIndex].tileCount + 1,
        rows,
        columns,
      };

      state.tilesets[tilesetIndex] = newTileset;
    },
    createTileset: (
      state,
      action: PayloadAction<{ tag: string; tileSize: number }>
    ) => {
      const tilesetTag = action.payload.tag;
      const tileSize = action.payload.tileSize;

      const newTileset: Tileset = {
        tag: tilesetTag,
        tileWidth: tileSize,
        tileHeight: tileSize,
        base64:
          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR42mP8/wcAAwAB/ep9lpAAAAABJRU5ErkJggg==",
        tileCount: 1,
        rows: 1,
        columns: 1,
      };
      state.tilesets.push(newTileset);
    },
    attachNewBase64ToTileset: (
      state,
      action: PayloadAction<{ tag: string; base64: string }>
    ) => {
      const tilesetTag = action.payload.tag;
      const base64 = action.payload.base64;

      const tilesetIndex = state.tilesets.findIndex(
        (tilesetObject: Tileset) => tilesetObject.tag === tilesetTag
      );
      if (tilesetIndex === -1) {
        return;
      }
      const newTileset = {
        ...state.tilesets[tilesetIndex],
        base64,
      };

      state.tilesets[tilesetIndex] = newTileset;
    },
  },
});
export const {
  toggleFileExplorer,
  setProjectDirectory,
  setError,
  addSTDToLog,
  setFilesAndFolders,
  refreshProject,
  setMapInfo,
  setTilesetInfo,
  addToMapHistory,
  popFromMapHistory,
  popFromMapUndoHistory,
  clearRemovedMapHistory,
  runCommand,
  addColor,
  removeColor,
  attachNewBase64ToTileset,
  addTileToTileset,
  createTileset,
} = GlobalSlice.actions;

export default GlobalSlice.reducer;
