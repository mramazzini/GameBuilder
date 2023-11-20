import { SET_SELECTED_TILE, SET_SELECTED_TILESET } from "./actions";
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
    default:
      return state;
  }
};
