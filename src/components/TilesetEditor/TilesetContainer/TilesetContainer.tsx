import SelectTile from "./SelectTile";
import TileEditor from "./TileEditor";
import { useEffect } from "react";
import { useTilesetContext } from "../TilesetState/TilesetContext";
import { useProjectContext } from "../../../utils/GlobalState/GlobalState";
import TilesetContainerKeyListener from "./TileContainerKeyListener";
const TilesetContainer = () => {
  const { state, dispatch } = useTilesetContext();
  const { state: projectState, dispatch: projectDispatch } =
    useProjectContext();

  useEffect(() => {
    //add keyListener
    const keyListener = (e: KeyboardEvent) => {
      TilesetContainerKeyListener(e, dispatch, state, projectDispatch);
    };
    window.addEventListener("keydown", keyListener);
    return () => {
      window.removeEventListener("keydown", keyListener);
    };
  }, []);

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
