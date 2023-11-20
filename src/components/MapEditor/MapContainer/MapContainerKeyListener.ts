import {
  TOGGLE_COLLIDER_VISION,
  TOGGLE_ADDING_COLLIDER,
  MOVE_TILE_COLUMN_LEFT,
  MOVE_TILE_COLUMN_RIGHT,
  MOVE_TILE_ROW_UP,
  MOVE_TILE_ROW_DOWN,
} from "../MapState/actions";
import {
  POP_FROM_MAP_HISTORY,
  POP_FROM_MAP_UNDO_HISTORY,
} from "../../../utils/GlobalState/actions";

import { MapState } from "../../../utils/types";

const MapContainerKeyListener = (
  e: KeyboardEvent,
  dispatch: any,
  state: MapState,
  projectDispatch: any
) => {
  if (e.key === "Shift") {
    dispatch({
      type: TOGGLE_COLLIDER_VISION,
      payload: !state.colliderVision,
    });
  }
  if (e.key === "z") {
    projectDispatch({
      type: POP_FROM_MAP_HISTORY,
      payload: state.selectedMap.tag,
    });
  }
  if (e.key === "y") {
    projectDispatch({
      type: POP_FROM_MAP_UNDO_HISTORY,
      payload: state.selectedMap.tag,
    });
  }
  if (e.key === "Control") {
    dispatch({
      type: TOGGLE_ADDING_COLLIDER,
      payload: !state.addingCollider,
    });
  }
  if (e.key === "w") {
    dispatch({
      type: MOVE_TILE_ROW_UP,
    });
  }
  if (e.key === "s") {
    dispatch({
      type: MOVE_TILE_ROW_DOWN,
    });
  }
  if (e.key === "a") {
    console.log("a");
    dispatch({
      type: MOVE_TILE_COLUMN_LEFT,
    });
  }
  if (e.key === "d") {
    dispatch({
      type: MOVE_TILE_COLUMN_RIGHT,
    });
  }
};

export default MapContainerKeyListener;
