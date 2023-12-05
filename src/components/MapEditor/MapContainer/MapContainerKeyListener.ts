import {
  toggleColliderVision,
  moveTileColumnLeft,
  moveTileColumnRight,
  moveTileRowUp,
  moveTileRowDown,
  setSelectedLayer,
  tabSelectedLayer,
} from "../../../utils/redux/reducers/MapReducers";

import {
  popFromMapHistory,
  popFromMapUndoHistory,
} from "../../../utils/redux/reducers/GlobalReducers";

import { MapState } from "../../../utils/types";

const MapContainerKeyListener = async (
  e: KeyboardEvent,
  dispatch: any,
  state: MapState
) => {
  if (e.key === "Shift") {
    await dispatch(toggleColliderVision());
    return;
  }
  if (e.key === "Tab") {
    e.preventDefault();
    await dispatch(tabSelectedLayer());
  }
  if (e.key === "z" && e.ctrlKey) {
    await dispatch(
      popFromMapHistory({
        tag: state.selectedMap.tag,
        layer: state.selectedLayer,
      })
    );

    return;
  }
  if (e.key === "y" && e.ctrlKey) {
    //FIX
    // await dispatch(popFromMapUndoHistory(state.selectedMap.tag));

    return;
  }

  if (e.key === "w") {
    await dispatch(moveTileRowUp());

    return;
  }
  if (e.key === "s") {
    await dispatch(moveTileRowDown());
    return;
  }
  if (e.key === "a") {
    await dispatch(moveTileColumnLeft());
    return;
  }
  if (e.key === "d") {
    await dispatch(moveTileColumnRight());
    return;
  }
};

export default MapContainerKeyListener;
