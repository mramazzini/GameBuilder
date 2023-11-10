import { SET_PROJECT_DIRECTORY } from "./actions";

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_PROJECT_DIRECTORY:
      console.log("reducer: SET_PROJECT_DIRECTORY to ", action.payload, "");
      return {
        ...state,
        projectDirectory: action.payload,
      };
    default:
      return state;
  }
};
