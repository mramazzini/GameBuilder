import { Map, MapState, Tileset } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
const initialState: MapState = {
  selectedMap: {
    tag: "",
    sizeX: 0,
    sizeY: 0,
    tileset: "",
    layers: [{ tag: "", tiles: [] }],
    colliders: [],
  },
  selectedTileset: {
    tag: "",
    columns: 0,
    rows: 0,
    tileWidth: 0,
    tileHeight: 0,
    base64: "",
    tileCount: 0,
  },
  selectedLayer: -1,

  selectedTile: -1,
  colliderVision: false,
};
export const MapSlice = createSlice({
  name: "Map",
  initialState,

  reducers: {
    setSelectedMap: (state, action: PayloadAction<Map>) => {
      state.selectedMap = action.payload;
    },
    setColliderVision: (state, action: PayloadAction<boolean>) => {
      state.colliderVision = action.payload;
    },
    setSelectedLayer: (state, action: PayloadAction<number>) => {
      state.selectedLayer = action.payload;
    },
    setSelectedTile: (state, action: PayloadAction<number>) => {
      state.selectedTile = action.payload;
    },
    setSelectedTileset: (state, action: PayloadAction<Tileset>) => {
      state.selectedTile = 0;
      state.selectedTileset = action.payload;
    },
    toggleColliderVision: (state) => {
      state.colliderVision = !state.colliderVision;
    },
    moveTileColumnLeft: (state) => {
      if (state.selectedTile === 0) return state;
      state.selectedTile -= 1;
    },
    moveTileColumnRight: (state) => {
      if (state.selectedTile === state.selectedTileset.tileCount - 1)
        return state;
      state.selectedTile += 1;
    },
    moveTileRowUp: (state) => {
      if (state.selectedTile <= 9) return state;
      state.selectedTile -= state.selectedTileset.columns;
    },
    moveTileRowDown: (state) => {
      if (
        state.selectedTile === state.selectedTileset.tileCount - 1 ||
        state.selectedTile + state.selectedTileset.columns >
          state.selectedTileset.tileCount - 1
      )
        return state;
      state.selectedTile += state.selectedTileset.columns;
    },
    tabSelectedLayer: (state) => {
      const newTab = state.selectedLayer + 1;
      if (newTab < state.selectedMap.layers.length)
        state.selectedLayer = newTab;
      else state.selectedLayer = -1;
    },
    addTileToMap: (state, action: PayloadAction<any>) => {
      const tile = action.payload.newTile;
      const layer = action.payload.layer;
      const tilePosition = action.payload.tilePosition;

      if (layer === -1) return;
      if (
        state.selectedMap.layers[layer].tiles[tilePosition.y][
          tilePosition.x
        ] === tile
      )
        return;
      state.selectedMap.layers[layer].tiles[tilePosition.y][tilePosition.x] =
        tile;
    },
    setColliderAtSelectedMap: (state, action: PayloadAction<any>) => {
      const tilePosition = action.payload.tilePosition;

      state.selectedMap.colliders[tilePosition.y][tilePosition.x] =
        action.payload.collider;
    },
  },
});

export const {
  setColliderAtSelectedMap,
  setSelectedMap,
  setSelectedLayer,
  setSelectedTile,
  setSelectedTileset,
  toggleColliderVision,
  moveTileColumnLeft,
  moveTileColumnRight,
  moveTileRowUp,
  moveTileRowDown,
  tabSelectedLayer,
  setColliderVision,
  addTileToMap,
} = MapSlice.actions;

export default MapSlice.reducer;
