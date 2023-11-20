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
} from "./actions";
import { getCurrentTime, getMapInfo } from "../helpers";
import { ProjectState } from "../types";

export const reducer = (state: ProjectState, action: any): ProjectState => {
  if (!action.type) {
    console.error("reducer: no action type");
    return state;
  }

  const logReducers = true;
  switch (action.type) {
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

      newMapObject.tiles[oldTile.tilePosition[0]][oldTile.tilePosition[1]] = {
        ...oldTile.tile,
      };

      const newMaps = state.maps;
      console.log(
        newMaps[mapObjectIndex].tiles[oldTile.tilePosition[0]][
          oldTile.tilePosition[1]
        ]
      );
      newMaps[mapObjectIndex] = newMapObject;
      console.log(
        newMaps[mapObjectIndex].tiles[oldTile.tilePosition[0]][
          oldTile.tilePosition[1]
        ]
      );
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
      console.log("POP_FROM_MAP_HISTORY");
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
      newMapObject.tiles[oldTile.tilePosition[0]][oldTile.tilePosition[1]] = {
        ...oldTile.tile,
      };
      const newMaps = state.maps;
      console.log(
        newMaps[mapObjectIndex].tiles[oldTile.tilePosition[0]][
          oldTile.tilePosition[1]
        ]
      );
      newMaps[mapObjectIndex] = newMapObject;
      console.log(
        newMaps[mapObjectIndex].tiles[oldTile.tilePosition[0]][
          oldTile.tilePosition[1]
        ]
      );
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
    default:
      return state;
  }
};
