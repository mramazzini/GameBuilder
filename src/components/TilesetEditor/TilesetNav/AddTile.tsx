import { useTilesetContext } from "../../../utils/TilesetState/TilesetContext";
import { useProjectContext } from "../../../utils/GlobalState/GlobalState";
import { useState, useEffect } from "react";
import { ADD_TILE_TO_TILESET } from "../../../utils/GlobalState/actions";
import {
  SET_SELECTED_TILE,
  SET_SELECTED_TILESET,
} from "../../../utils/TilesetState/actions";

const AddTile = () => {
  const { state, dispatch } = useTilesetContext();
  const { state: projectState, dispatch: projectDispatch } =
    useProjectContext();
  const [isOpen, setIsOpen] = useState(false);
  const handleAddTile = () => {
    projectDispatch({
      type: ADD_TILE_TO_TILESET,
      payload: {
        tileset: state.selectedTileset.tag,
      },
    });
    dispatch({
      type: SET_SELECTED_TILESET,
      payload: projectState.tilesets.find(
        (tileset) => tileset.tag === state.selectedTileset.tag
      ),
    });
    dispatch({
      type: SET_SELECTED_TILE,
      payload: -1,
    });
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
