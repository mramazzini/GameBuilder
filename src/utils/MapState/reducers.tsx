import { MapState } from "../types";
import {
  SET_SELECTED_MAP,
  SET_COLLIDER_VISION,
  SET_ADDING_COLLIDER,
  SET_SELECTED_TILE,
  SET_SELECTED_TILESET,
  TOGGLE_ADDING_COLLIDER,
  TOGGLE_COLLIDER_VISION,
  MOVE_TILE_COLUMN_LEFT,
  MOVE_TILE_COLUMN_RIGHT,
  MOVE_TILE_ROW_UP,
  MOVE_TILE_ROW_DOWN,
  SET_SELECTED_LAYER,
  TAB_SELECTED_LAYER,
} from "./actions";

export const reducer = (state: MapState, action: any): MapState => {
  switch (action.type) {
    case SET_SELECTED_MAP:
      return {
        ...state,
        selectedMap: action.payload,
      };
    case SET_SELECTED_LAYER:
      return {
        ...state,
        selectedLayer: action.payload,
      };
    case SET_COLLIDER_VISION:
      return {
        ...state,
        colliderVision: action.payload,
      };

    case SET_SELECTED_TILE:
      return {
        ...state,
        selectedTile: action.payload,
      };
    case SET_SELECTED_TILESET:
      return {
        ...state,
        selectedTile: 0,
        selectedTileset: action.payload,
      };

    case TOGGLE_COLLIDER_VISION:
      return {
        ...state,
        colliderVision: !state.colliderVision,
      };

    case MOVE_TILE_COLUMN_LEFT:
      if (state.selectedTile === 0) return state;
      return {
        ...state,
        selectedTile: state.selectedTile - 1,
      };

    case MOVE_TILE_COLUMN_RIGHT:
      if (state.selectedTile === state.selectedTileset.tileCount - 1)
        return state;
      return {
        ...state,
        selectedTile: state.selectedTile + 1,
      };

    case MOVE_TILE_ROW_UP:
      if (state.selectedTile <= 9) return state;
      return {
        ...state,
        selectedTile: state.selectedTile - state.selectedTileset.columns,
      };

    case MOVE_TILE_ROW_DOWN:
      if (
        state.selectedTile === state.selectedTileset.tileCount - 1 ||
        state.selectedTile + state.selectedTileset.columns >
          state.selectedTileset.tileCount - 1
      )
        return state;
      return {
        ...state,
        selectedTile: state.selectedTile + state.selectedTileset.columns,
      };

    case TAB_SELECTED_LAYER: {
      const newTab = state.selectedLayer + 1;
      if (newTab < state.selectedMap.layers.length)
        return {
          ...state,
          selectedLayer: newTab,
        };
      return {
        ...state,
        selectedLayer: -1,
      };
    }
    default:
      return state;
  }
};
