import { Tileset, TilesetState } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: TilesetState = {
  selectedTileset: {
    tag: "",
    columns: 0,
    rows: 0,
    tileWidth: 0,
    tileHeight: 0,
    base64: "",
    tileCount: 0,
  },
  selectedTile: -1,
  selectedColor: 0,
};
export const TilesetSlice = createSlice({
  name: "Tileset",
  initialState,

  reducers: {
    setSelectedTileset: (state, action: PayloadAction<Tileset>) => {
      state.selectedTile = -1;
      state.selectedTileset = action.payload;
    },
    setSelectedTile: (state, action: PayloadAction<number>) => {
      state.selectedTile = action.payload;
    },
    setSelectedColor: (state, action: PayloadAction<number>) => {
      state.selectedColor = action.payload;
    },
  },
});

export const { setSelectedTileset, setSelectedTile, setSelectedColor } =
  TilesetSlice.actions;

export default TilesetSlice.reducer;
