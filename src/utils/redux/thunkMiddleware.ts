import { Action, Dispatch } from "redux";
type ThunkAction = (dispatch: Dispatch, getState: () => any) => void;

const thunk =
  ({ dispatch, getState }: { dispatch: Dispatch; getState: () => any }) =>
  (next: Dispatch) =>
  (action: Action | ThunkAction) => {
    if (typeof action === "function") {
      return (action as ThunkAction)(dispatch, getState);
    }

    return next(action);
  };

export default thunk;
