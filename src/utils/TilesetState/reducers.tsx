import {
  SET_SELECTED_TILE,
  SET_SELECTED_TILESET,
  SET_SELECTED_COLOR,
} from "./actions";
import { TilesetState } from "../types";
const logReducers = true;
export const reducer = (state: TilesetState, action: any) => {
  switch (action.type) {
    case SET_SELECTED_TILESET:
      if (logReducers) console.log(SET_SELECTED_TILE, action.payload);
      return {
        ...state,
        selectedTile: -1,
        selectedTileset: action.payload,
      };

    case SET_SELECTED_TILE:
      if (logReducers) console.log(SET_SELECTED_TILESET, action.payload);
      return {
        ...state,
        selectedTile: action.payload,
      };

    case SET_SELECTED_COLOR:
      if (logReducers) console.log(SET_SELECTED_COLOR, action.payload);

      return {
        ...state,
        selectedColor: action.payload,
      };

    default:
      return state;
  }
};
