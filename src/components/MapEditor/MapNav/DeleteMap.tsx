import { useMapContext } from "../MapState/MapContext";
import { useProjectContext } from "../../../utils/GlobalState/GlobalState";
const ipcRenderer = window.ipcRenderer;
import { useCallback, useEffect } from "react";
import { SET_SELECTED_MAP, SET_SELECTED_TILESET } from "../MapState/actions";

const DeleteMap = () => {
  const { state, dispatch } = useMapContext();
  const { state: projectState, dispatch: projectDispatch } =
    useProjectContext();

  const deleteMap = useCallback(() => {
    ipcRenderer.send("delete-map", {
      map: state.selectedMap.tag,
      projectDirectory: projectState.projectDirectory,
    });
  }, [state.selectedMap.tag, projectState.projectDirectory]);

  useEffect(() => {
    const handleMapDeleted = (event: any) => {
      //set to first map in list and its tileset
      ipcRenderer.send("refresh-project", projectState.projectDirectory);
      dispatch({
        type: SET_SELECTED_MAP,
        payload: projectState.maps[0],
      });
      dispatch({
        type: SET_SELECTED_TILESET,
        payload:
          projectState.tilesets.find(
            (tileset) => tileset.tag === projectState.maps[0].tileset
          ) || "none",
      });
    };
    ipcRenderer.on("map-deleted", handleMapDeleted);
    return () => {
      ipcRenderer.removeListener("map-deleted", handleMapDeleted);
    };
  }, []);

  return (
    <div className='delete-map'>
      <button
        className='hover:bg-black/70 hover:text-white/80 px-5 py-1 rounded-sm flex justify-center items-center font-bold bg-white/25 text-white border border-white/25 rounded-sm p-1 m-2  px-2 py-1 rounded-sm flex flex-col justify-center items-center'
        onClick={deleteMap}
      >
        Delete Map
      </button>
    </div>
  );
};

export default DeleteMap;
