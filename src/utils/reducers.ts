import { SET_PROJECT_DIRECTORY, SET_ERROR } from "./actions";

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
    default:
      return state;
  }
};
