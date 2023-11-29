import SelectTile from "./SelectTile";
import TileEditor from "./TileEditor";
import { useEffect } from "react";
import { useTilesetContext } from "../../../utils/TilesetState/TilesetContext";
import { useProjectContext } from "../../../utils/GlobalState/GlobalState";
import TilesetContainerKeyListener from "./TileContainerKeyListener";
import { SET_SELECTED_TILESET } from "../../../utils/TilesetState/actions";
const TilesetContainer = () => {
  const { state, dispatch } = useTilesetContext();
  const { state: projectState, dispatch: projectDispatch } =
    useProjectContext();

  useEffect(() => {
    //add keyListener
    const keyListener = (e: KeyboardEvent) => {
      TilesetContainerKeyListener(
        e,
        dispatch,
        state,
        projectState,
        projectDispatch
      );
    };
    window.addEventListener("keydown", keyListener);
    return () => {
      window.removeEventListener("keydown", keyListener);
    };
  }, [state, projectState]);

  useEffect(() => {
    //set default tileset (second condition is there to rerender on escape)
    if (projectState.tilesets.length > 0 && state.selectedTile === -1) {
      dispatch({
        type: SET_SELECTED_TILESET,
        payload: projectState.tilesets[0],
      });
    }
  }, [projectState.tilesets, state.selectedTile, state.selectedTileset]);

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
