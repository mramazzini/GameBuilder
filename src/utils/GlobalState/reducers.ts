import {
  SET_PROJECT_DIRECTORY,
  SET_ERROR,
  ADD_STD_TO_LOG,
  SET_FILES_AND_FOLDERS,
} from "./actions";
import { getCurrentTime, getMapInfo } from "../helpers";

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_PROJECT_DIRECTORY:
      console.log("reducer: SET_PROJECT_DIRECTORY to ", action.payload, "");
      return {
        ...state,
        projectDirectory: action.payload,
      };
    case SET_ERROR:
      console.log("reducer: SET_ERROR to ", action.payload, "");
      return {
        ...state,
        error: action.payload,
      };
    case ADD_STD_TO_LOG:
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
      console.log("reducer: SET_FILES_AND_FOLDERS to ", action.payload, "");
      // Calculate Map information
      getMapInfo(state.projectDirectory);
      return {
        ...state,
        filesAndFolders: action.payload,
      };
    case "SET_MAP_INFO":
      console.log("reducer: SET_MAP_INFO to ", action.payload, "");
      return {
        ...state,
        maps: action.payload,
      };
    default:
      return state;
  }
};
