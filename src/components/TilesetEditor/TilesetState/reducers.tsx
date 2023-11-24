import {
  SET_SELECTED_TILE,
  SET_SELECTED_TILESET,
  ADD_COLOR,
  SET_SELECTED_COLOR,
  REMOVE_COLOR,
} from "./actions";
import { TilesetState } from "../../../utils/types";
export const reducer = (state: TilesetState, action: any) => {
  switch (action.type) {
    case SET_SELECTED_TILESET:
      return {
        ...state,
        selectedTile: -1,
        selectedTileset: action.payload,
      };

    case SET_SELECTED_TILE:
      return {
        ...state,
        selectedTile: action.payload,
      };
    case ADD_COLOR:
      return {
        ...state,
        colors: [...state.colors, action.payload],
      };
    case REMOVE_COLOR:
      return {
        ...state,
        colors: state.colors.filter((color) => color !== action.payload),
      };
    case SET_SELECTED_COLOR:
      return {
        ...state,
        selectedColor: action.payload,
      };
    default:
      return state;
  }
};
