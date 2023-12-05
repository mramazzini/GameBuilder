import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../utils/redux/store";
const ipcRenderer = window.ipcRenderer;
import { useCallback, useEffect, useState } from "react";

import {
  setSelectedMap,
  setSelectedTileset,
} from "../../../utils/redux/reducers/MapReducers";

const DeleteMap = () => {
  const state = useSelector((state: RootState) => state.map);
  const projectState = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    //esc key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const deleteMap = useCallback(() => {
    ipcRenderer.send("delete-map", {
      map: state.selectedMap.tag,
      projectDirectory: projectState.projectDirectory,
    });
  }, [state.selectedMap, projectState.projectDirectory]);

  useEffect(() => {
    const handleMapDeleted = async (event: any) => {
      //set to first map in list and its tileset
      ipcRenderer.send("refresh-project", projectState.projectDirectory);
      await dispatch(setSelectedMap(projectState.maps[0]));

      await dispatch(
        setSelectedTileset(
          projectState.tilesets.find(
            (tileset) => tileset.tag === projectState.maps[0].tileset
          ) || projectState.tilesets[0]
        )
      );
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
        onClick={() => setIsOpen(true)}
      >
        Delete Map
      </button>
      {isOpen && (
        <div className='w-screen h-screen bg-black/50 absolute z-10 top-0 left-0 flex justify-center items-center'>
          <div
            className='w-96  shadow-xl border-3 border-black  flex items-center flex-col bg-slate-950 absolute top-1/2
           left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md shadow-lg text-white font-mono'
          >
            <div className='w-full h-full bg-black/50 text-white/75 border border-white/25 rounded-sm p-1 m-2  px-2 py-1 rounded-sm flex flex-col justify-center items-center '>
              <div className='title text-3xl font-bold'>Delete Map?</div>
              <div className='selected-map text-lg'>
                {state.selectedMap.tag}
              </div>
              <div className='map-info flex flex-col font-bold justify-between items-start'>
                This cannot be undone
              </div>
            </div>
            <div className='create-map-body'></div>
            <div className='create-map-footer'>
              <button
                onClick={() => {
                  setIsOpen(false);
                  deleteMap();
                }}
                className='bg-black/70 text-white px-5 py-1 rounded-md hover:bg-black/80 m-2 '
              >
                Yes
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                }}
                className='bg-black/70 text-white px-5 py-1 rounded-md hover:bg-black/80 m-2'
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteMap;
