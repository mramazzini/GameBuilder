import { TilesetState, ProjectState } from "../../../utils/types";
import {
  SET_SELECTED_COLOR,
  SET_SELECTED_TILE,
} from "../../../utils/TilesetState/actions";

const TilesetContainerKeyListener = (
  e: KeyboardEvent,
  dispatch: any,
  state: TilesetState,
  projectState: ProjectState,
  projectDispatch: any
) => {
  if (e.key === "Escape") {
    dispatch({
      type: SET_SELECTED_TILE,
      payload: -1,
    });
  }
  if (e.key === "w") {
    if (state.selectedColor < 10) return;
    dispatch({
      type: SET_SELECTED_COLOR,
      payload: state.selectedColor - 10,
    });
  }
  if (e.key === "a") {
    if (state.selectedColor === 0) return;
    dispatch({
      type: SET_SELECTED_COLOR,
      payload: state.selectedColor - 1,
    });
  }
  if (e.key === "s") {
    if (state.selectedColor > projectState.colors.length - 11) return;
    dispatch({
      type: SET_SELECTED_COLOR,
      payload: state.selectedColor + 10,
    });
  }
  if (e.key === "d") {
    if (state.selectedColor === projectState.colors.length - 1) return;
    dispatch({
      type: SET_SELECTED_COLOR,
      payload: state.selectedColor + 1,
    });
  }
};

export default TilesetContainerKeyListener;
