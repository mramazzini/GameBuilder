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
} from "./actions";

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_SELECTED_MAP:
      return {
        ...state,
        selectedMap: action.payload,
      };
    case SET_COLLIDER_VISION:
      return {
        ...state,
        colliderVision: action.payload,
      };
    case SET_ADDING_COLLIDER:
      return {
        ...state,
        addingCollider: action.payload,
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
    case TOGGLE_ADDING_COLLIDER:
      return {
        ...state,
        addingCollider: !state.addingCollider,
        colliderVision:
          !state.addingCollider === true ? true : state.colliderVision,
      };
    case TOGGLE_COLLIDER_VISION:
      return {
        ...state,
        colliderVision: !state.colliderVision,
        addingCollider: false,
      };

    case MOVE_TILE_COLUMN_LEFT:
      if (state.selectedTile % 10 == 0)
        return {
          ...state,
          selectedTile: state.selectedTile + 9,
        };
      return {
        ...state,
        selectedTile: state.selectedTile - 1,
      };
    case MOVE_TILE_COLUMN_RIGHT:
      if (state.selectedTile % 10 == state.selectedTileset.columns - 1)
        return {
          ...state,
          selectedTile: Math.floor(state.selectedTile / 10) * 10,
        };

      return {
        ...state,
        selectedTile: state.selectedTile + 1,
      };
    case MOVE_TILE_ROW_UP:
      if (state.selectedTile < 10)
        return {
          ...state,
          selectedTile:
            state.selectedTile +
            state.selectedTileset.columns * (state.selectedTileset.rows - 1),
        };
      return {
        ...state,
        selectedTile: state.selectedTile - 10,
      };

    case MOVE_TILE_ROW_DOWN:
      if (Math.floor(state.selectedTile / 10) >= state.selectedTileset.rows - 1)
        return {
          ...state,
          selectedTile: state.selectedTile % state.selectedTileset.columns,
        };
      return {
        ...state,
        selectedTile: state.selectedTile + 10,
      };

    default:
      return state;
  }
};
