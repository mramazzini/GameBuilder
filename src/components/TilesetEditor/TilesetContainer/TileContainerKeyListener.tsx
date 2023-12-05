import { TilesetState, ProjectState } from "../../../utils/types";
import {
  setSelectedColor,
  setSelectedTile,
} from "../../../utils/redux/reducers/TilesetReducers";

const TilesetContainerKeyListener = async (
  e: KeyboardEvent,
  dispatch: any,
  state: TilesetState,
  projectState: ProjectState
) => {
  if (e.key === "Escape") {
    await dispatch(setSelectedTile(-1));
  }
  if (e.key === "w") {
    if (state.selectedColor < 10) return;
    await dispatch(setSelectedColor(state.selectedColor - 10));
  }
  if (e.key === "a") {
    if (state.selectedColor === 0) return;
    await dispatch(setSelectedColor(state.selectedColor - 1));
  }
  if (e.key === "s") {
    if (state.selectedColor > projectState.colors.length - 11) return;
    await dispatch(setSelectedColor(state.selectedColor + 10));
  }
  if (e.key === "d") {
    if (state.selectedColor === projectState.colors.length - 1) return;
    await dispatch(setSelectedColor(state.selectedColor + 1));
  }
};

export default TilesetContainerKeyListener;
