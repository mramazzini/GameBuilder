import SelectTile from "./SelectTile";
import TileEditor from "./TileEditor";
import { useEffect } from "react";

import TilesetContainerKeyListener from "./TileContainerKeyListener";

import { setSelectedTileset } from "../../../utils/redux/reducers/TilesetReducers";
import { RootState } from "../../../utils/redux/store";
import { useSelector, useDispatch } from "react-redux";
const TilesetContainer = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.tileset);
  const projectState = useSelector((state: RootState) => state.global);
  useEffect(() => {
    //add keyListener
    const keyListener = (e: KeyboardEvent) => {
      TilesetContainerKeyListener(e, dispatch, state, projectState);
    };
    window.addEventListener("keydown", keyListener);
    return () => {
      window.removeEventListener("keydown", keyListener);
    };
  }, [state, projectState]);

  useEffect(() => {
    //set default tileset (second condition is there to rerender on escape)
    if (projectState.tilesets.length > 0 && state.selectedTile === -1) {
      dispatch(setSelectedTileset(projectState.tilesets[0]));
    }
  }, [projectState.tilesets, state.selectedTile]);

  return (
    <div className='tileset-container w-full'>
      {state.selectedTile === -1 ? (
        <SelectTile />
      ) : (
        <TileEditor tileNum={state.selectedTile} />
      )}
    </div>
  );
};

export default TilesetContainer;
