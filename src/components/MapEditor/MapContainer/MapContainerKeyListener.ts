import {
  TOGGLE_COLLIDER_VISION,
  TOGGLE_ADDING_COLLIDER,
  MOVE_TILE_COLUMN_LEFT,
  MOVE_TILE_COLUMN_RIGHT,
  MOVE_TILE_ROW_UP,
  MOVE_TILE_ROW_DOWN,
  SET_SELECTED_LAYER,
  TAB_SELECTED_LAYER,
} from "../../../utils/MapState/actions";
import {
  POP_FROM_MAP_HISTORY,
  POP_FROM_MAP_UNDO_HISTORY,
} from "../../../utils/GlobalState/actions";

import { MapState } from "../../../utils/types";

const MapContainerKeyListener = async (
  e: KeyboardEvent,
  dispatch: any,
  state: MapState,
  projectDispatch: any
) => {
  if (e.key === "Shift") {
    await dispatch({
      type: TOGGLE_COLLIDER_VISION,
      payload: !state.colliderVision,
    });
    return;
  }
  if (e.key === "Tab") {
    e.preventDefault();
    await dispatch({
      type: TAB_SELECTED_LAYER,
    });
  }
  if (e.key === "z") {
    await projectDispatch({
      type: POP_FROM_MAP_HISTORY,
      payload: state.selectedMap.tag,
    });
    return;
  }
  if (e.key === "y") {
    await projectDispatch({
      type: POP_FROM_MAP_UNDO_HISTORY,
      payload: state.selectedMap.tag,
    });
    return;
  }

  if (e.key === "w") {
    await dispatch({
      type: MOVE_TILE_ROW_UP,
    });
    return;
  }
  if (e.key === "s") {
    await dispatch({
      type: MOVE_TILE_ROW_DOWN,
    });
    return;
  }
  if (e.key === "a") {
    console.log("a");
    await dispatch({
      type: MOVE_TILE_COLUMN_LEFT,
    });
    return;
  }
  if (e.key === "d") {
    await dispatch({
      type: MOVE_TILE_COLUMN_RIGHT,
    });
    return;
  }
};

export default MapContainerKeyListener;
