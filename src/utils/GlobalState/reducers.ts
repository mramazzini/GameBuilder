import {
  SET_PROJECT_DIRECTORY,
  SET_ERROR,
  ADD_STD_TO_LOG,
  SET_FILES_AND_FOLDERS,
  REFRESH_PROJECT,
  SET_MAP_INFO,
  SET_TILESET_INFO,
  ADD_TO_MAP_HISTORY,
  POP_FROM_MAP_HISTORY,
  POP_FROM_MAP_UNDO_HISTORY,
  CLEAR_REMOVED_MAP_HISTORY,
  TOGGLE_FILE_EXPLORER,
  RUN_COMMAND,
  ADD_COLOR,
  REMOVE_COLOR,
  ADD_TILE_TO_TILESET,
  REMOVE_TILE_FROM_TILESET,
  SET_NEW_BASE_64_IMAGE,
  CREATE_TILESET,
} from "./actions";
import { commandLineResolvers } from "../commandLineResolvers";
import { getCurrentTime, getMapInfo } from "../helpers";
import { ProjectState, Tile, Tileset, log } from "../types";

export const reducer = (state: ProjectState, action: any): ProjectState => {
  if (!action.type) {
    console.error("reducer: no action type");
    return state;
  }

  const logReducers = true;
  switch (action.type) {
    case TOGGLE_FILE_EXPLORER:
      logReducers ?? console.log("reducer: TOGGLE_FILE_EXPLORER");
      return {
        ...state,
        fileExplorerOpened: !state.fileExplorerOpened,
      };

    case SET_PROJECT_DIRECTORY:
      logReducers ??
        console.log("reducer: SET_PROJECT_DIRECTORY to ", action.payload, "");

      document.title = action.payload.split("\\").pop() || "";
      return {
        ...state,
        projectDirectory: action.payload,
      };
    case SET_ERROR:
      logReducers ?? console.log("reducer: SET_ERROR to ", action.payload, "");
      return {
        ...state,
        error: action.payload,
      };
    case ADD_STD_TO_LOG:
      logReducers ??
        console.log("reducer: ADD_STD_TO_LOG to ", action.payload, "");
      //stop repeating messages
      if (state.stdLog.length > 0) {
        const lastLogEntry = state.stdLog[state.stdLog.length - 1];
        if (lastLogEntry.message === action.payload) {
          return state;
        }
      }

      //create new object with timestamp
      const newLogEntry = {
        timestamp: getCurrentTime(),
        message: action.payload,
      };

      return {
        ...state,
        stdLog: [...state.stdLog, newLogEntry],
      };
    case SET_FILES_AND_FOLDERS:
      logReducers ??
        console.log("reducer: SET_FILES_AND_FOLDERS to ", action.payload, "");
      // Calculate Map information
      getMapInfo(state.projectDirectory);

      return {
        ...state,
        filesAndFolders: action.payload,
      };
    case REFRESH_PROJECT:
      logReducers ??
        console.log("reducer: REFRESH_PROJECT to ", action.payload, "");
      // Calculate Map information
      getMapInfo(state.projectDirectory);

      return {
        ...state,
        filesAndFolders: action.payload,
      };
    case SET_MAP_INFO:
      logReducers ??
        console.log("reducer: SET_MAP_INFO to ", action.payload, "");
      return {
        ...state,
        maps: action.payload,
      };
    case SET_TILESET_INFO:
      action.payload.map((tileset: any) => {
        tileset.path = "tileset_" + tileset.tag + ".png";
      });
      logReducers ??
        console.log("reducer: SET_TILESET_INFO to ", action.payload, "");

      return {
        ...state,
        tilesets: action.payload,
      };
    case ADD_TO_MAP_HISTORY: {
      //check if map is already in history
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
        return {
          ...state,
          history: {
            ...state.history,
            maps: [...state.history.maps, newMap],
          },
        };
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
          return state;
        }
      }

      const newMaps = state.history.maps;
      newMaps[mapIndex].current.push({
        tile: action.payload.tile,
        tilePosition: action.payload.tilePosition,
        layer: action.payload.layer,
      });

      return {
        ...state,
        history: {
          ...state.history,
          maps: newMaps,
        },
      };
    }
    case POP_FROM_MAP_UNDO_HISTORY: {
      //Redo button
      const mapTag = action.payload;
      if (!mapTag) {
        return state;
      }
      const mapHistoryIndex = state.history.maps.findIndex(
        (map: any) => map.mapTag === mapTag
      );
      if (mapHistoryIndex === -1) {
        return state;
      }
      console.log("POP_FROM_MAP_UNDO_HISTORY");
      const newMapsHistory = state.history.maps;
      console.log(newMapsHistory[mapHistoryIndex]);

      const oldTile = newMapsHistory[mapHistoryIndex].removed.pop();
      if (!oldTile) {
        return state;
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
    }
    case POP_FROM_MAP_HISTORY: {
      logReducers ??
        console.log("reducer: POP_FROM_MAP_HISTORY", action.payload);
      const mapTag = action.payload.tag;
      const selectedLayer = action.payload.layer;
      if (!mapTag) {
        return state;
      }
      const mapHistoryIndex = state.history.maps.findIndex(
        (map: any) => map.mapTag === mapTag
      );
      if (mapHistoryIndex === -1) {
        return state;
      }

      const newMapsHistory = state.history.maps;
      console.log(newMapsHistory[mapHistoryIndex]);

      const oldTile = newMapsHistory[mapHistoryIndex].current.pop();
      if (!oldTile) {
        return state;
      }
      newMapsHistory[mapHistoryIndex].removed.push(oldTile as any);
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
    }
    case CLEAR_REMOVED_MAP_HISTORY: {
      const mapTag = action.payload;
      if (!mapTag) {
        return state;
      }
      const mapHistoryIndex = state.history.maps.findIndex(
        (map: any) => map.mapTag === mapTag
      );
      if (mapHistoryIndex === -1) {
        return state;
      }

      const newMapsHistory = state.history.maps;
      newMapsHistory[mapHistoryIndex].removed = [];

      return {
        ...state,
        history: {
          ...state.history,
          maps: newMapsHistory,
        },
      };
    }
    case RUN_COMMAND: {
      logReducers ??
        console.log("reducer: RUN_COMMAND to ", action.payload, "");
      //stop repeating messages

      const command = action.payload;
      const commandResult = commandLineResolvers(command);

      const newLogEntry: log = {
        timestamp: getCurrentTime(),
        message: commandResult,
      };

      if (state.stdLog.length > 0) {
        const lastLogEntry = state.stdLog[state.stdLog.length - 1];
        if (lastLogEntry.message === action.payload) {
          return state;
        }
      }
      return {
        ...state,
        stdLog: [...state.stdLog, newLogEntry],
      };
    }
    case ADD_COLOR:
      //check for duplicates
      const colorIndex = state.colors.findIndex((color) => {
        return (
          color.r === action.payload.r &&
          color.g === action.payload.g &&
          color.b === action.payload.b &&
          color.a === action.payload.a
        );
      });
      if (colorIndex !== -1) {
        return state;
      }

      return {
        ...state,
        colors: [...state.colors, action.payload],
      };
    case REMOVE_COLOR:
      return {
        ...state,
        colors: state.colors.filter((color) => color !== action.payload),
      };
    case SET_NEW_BASE_64_IMAGE: {
      const tile = action.payload.tile;
      const tileset = action.payload.tileset;
      const imageDataToReplaceTile = action.payload.image;

      //find tileset
      const tilesetIndex = state.tilesets.findIndex(
        (tilesetObject) => tilesetObject.tag === tileset.tag
      );

      //update tileset base64 image data at tile with new image by
      // drawing it to a canvas
      const oldTilesetImage =
        "data:image/png;base64," + state.tilesets[tilesetIndex].base64;

      const canvas = document.createElement("canvas");
      canvas.width = tileset.tileWidth * tileset.columns;
      canvas.height = tileset.tileHeight * tileset.rows;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return state;
      }

      const image = new Image();
      image.src = oldTilesetImage;
      image.onload = () => {
        ctx.drawImage(image, 0, 0);

        //get tile x and y based on tileset col and rows
        const tileX = tile % tileset.columns;
        const tileY = Math.floor(tile / tileset.columns);
        //set image data
        ctx.putImageData(
          imageDataToReplaceTile,
          tileX * tileset.tileWidth,
          tileY * tileset.tileHeight
        );
        //update base64 image
        const newBase64 = canvas.toDataURL("image/png").split(",")[1];

        //update tileset
        const newTileset = {
          ...state.tilesets[tilesetIndex],
          base64: newBase64,
        };

        //update tileset in state
        const newTilesets = state.tilesets;
        newTilesets[tilesetIndex] = newTileset;

        return {
          ...state,
          tilesets: newTilesets,
        };
      };
      return state;
    }
    case ADD_TILE_TO_TILESET: {
      const tilesetTag = action.payload.tileset;

      const tilesetIndex = state.tilesets.findIndex(
        (tilesetObject) => tilesetObject.tag === tilesetTag
      );
      if (tilesetIndex === -1) {
        return state;
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
      const newTilesets = state.tilesets;
      newTilesets[tilesetIndex] = newTileset;

      return {
        ...state,
        tilesets: newTilesets,
      };
    }
    case CREATE_TILESET: {
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

      return {
        ...state,
        tilesets: [...state.tilesets, newTileset],
      };
    }

    default:
      return state;
  }
};
