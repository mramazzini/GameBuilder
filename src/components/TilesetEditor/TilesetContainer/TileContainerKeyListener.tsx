import { TilesetState, ProjectState } from "../../../utils/types";
import {
  SET_SELECTED_COLOR,
  SET_SELECTED_TILE,
} from "../../../utils/TilesetState/actions";

const TilesetContainerKeyListener = async (
  e: KeyboardEvent,
  dispatch: any,
  state: TilesetState,
  projectState: ProjectState,
  projectDispatch: any
) => {
  if (e.key === "Escape") {
    await dispatch({
      type: SET_SELECTED_TILE,
      payload: -1,
    });
  }
  if (e.key === "w") {
    if (state.selectedColor < 10) return;
    await dispatch({
      type: SET_SELECTED_COLOR,
      payload: state.selectedColor - 10,
    });
  }
  if (e.key === "a") {
    if (state.selectedColor === 0) return;
    await dispatch({
      type: SET_SELECTED_COLOR,
      payload: state.selectedColor - 1,
    });
  }
  if (e.key === "s") {
    if (state.selectedColor > projectState.colors.length - 11) return;
    await dispatch({
      type: SET_SELECTED_COLOR,
      payload: state.selectedColor + 10,
    });
  }
  if (e.key === "d") {
    if (state.selectedColor === projectState.colors.length - 1) return;
    await dispatch({
      type: SET_SELECTED_COLOR,
      payload: state.selectedColor + 1,
    });
  }
};

export default TilesetContainerKeyListener;
