import { SET_PROJECT_DIRECTORY, SET_ERROR, ADD_STD_TO_LOG } from "./actions";
import { getCurrentTime } from "../helpers";

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
    default:
      return state;
  }
};
