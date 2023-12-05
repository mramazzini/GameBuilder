import { useState, useEffect } from "react";

import { addTileToTileset } from "../../../utils/redux/reducers/GlobalReducers";
import {
  setSelectedTile,
  setSelectedTileset,
} from "../../../utils/redux/reducers/TilesetReducers";
import { RootState } from "../../../utils/redux/store";
import { useSelector, useDispatch } from "react-redux";

const AddTile = () => {
  const dispatch = useDispatch();
  const projectState = useSelector((state: RootState) => state.global);
  const state = useSelector((state: RootState) => state.tileset);
  const handleAddTile = async () => {
    await dispatch(addTileToTileset(state.selectedTileset.tag));
    await dispatch(
      setSelectedTileset(
        projectState.tilesets.find(
          (tileset) => tileset.tag === state.selectedTileset.tag
        ) || projectState.tilesets[0]
      )
    );
    await dispatch(setSelectedTile(-1));
  };

  return (
    <div>
      <button
        className='add-tile hover:bg-black/70 hover:text-white/80 px-5 py-1 rounded-sm flex justify-center items-center font-bold bg-white/25 text-white border border-white/25 rounded-sm p-1 m-2  px-2 py-1 rounded-sm flex flex-col justify-center items-center '
        onClick={handleAddTile}
      >
        Add Tile
      </button>
    </div>
  );
};

export default AddTile;
