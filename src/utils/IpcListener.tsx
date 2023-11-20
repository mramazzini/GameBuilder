const ipcRenderer = window.ipcRenderer;
import { useEffect } from "react";
import {
  ADD_STD_TO_LOG,
  SET_PROJECT_DIRECTORY,
  SET_ERROR,
  SET_FILES_AND_FOLDERS,
  SET_MAP_INFO,
  SET_TILESET_INFO,
} from "./GlobalState/actions";
import { useProjectContext } from "./GlobalState/GlobalState";

const textDecoder = new TextDecoder("utf-8");

const decode = (data: any) => {
  return textDecoder.decode(data);
};

const IpcListener = () => {
  const { state, dispatch } = useProjectContext();
  const handleEngineStdout = (event: any, data: any) => {
    const decodedData = decode(data);
    // Update state asynchronously without triggering immediate rerender
    dispatch({ type: ADD_STD_TO_LOG, payload: decodedData });
  };

  const handleEngineStderr = (event: any, data: any) => {
    const decodedData = decode(data);
    // Update state asynchronously without triggering immediate rerender
    dispatch({ type: ADD_STD_TO_LOG, payload: decodedData });
  };

  const handleEngineExit = (event: any, data: any) => {
    // Handle engine exit if needed
  };

  const handleEngineInitialized = (event: any, data: any) => {
    // Handle engine initialization if needed
  };
  const selectedProject = (
    event: any,
    {
      selectedFolderPath,
      filesAndFolders,
    }: { selectedFolderPath: string; filesAndFolders: any }
  ) => {
    dispatch({
      type: SET_PROJECT_DIRECTORY,
      payload: selectedFolderPath,
    });

    dispatch({
      type: SET_FILES_AND_FOLDERS,
      payload: filesAndFolders,
    });
  };

  const createFolders = (
    event: any,
    {
      selectedFolderPath,
      filesAndFolders,
    }: { selectedFolderPath: string; filesAndFolders: any }
  ) => {
    dispatch({
      type: SET_PROJECT_DIRECTORY,
      payload: selectedFolderPath,
    });

    dispatch({
      type: SET_FILES_AND_FOLDERS,
      payload: filesAndFolders,
    });
  };

  const handleError = (event: any, err: any) => {
    //Error handling

    dispatch({
      type: SET_ERROR,
      payload: err,
    });
  };
  const requestMapInfo = (event: any, mapInfo: any) => {
    dispatch({
      type: SET_MAP_INFO,
      payload: mapInfo,
    });
  };

  const requestTileSetInfo = (event: any, tileSetInfo: any) => {
    dispatch({
      type: SET_TILESET_INFO,
      payload: tileSetInfo,
    });
  };
  const createMap = (event: any, args: any) => {
    if (args.success) {
      dispatch({
        type: SET_MAP_INFO,
        payload: args.mapInfo,
      });
    }
  };
  const refreshProject = (event: any, args: any) => {
    console.log("refreshing project");

    dispatch({
      type: SET_FILES_AND_FOLDERS,
      payload: args.filesAndFolders,
    });
    dispatch({
      type: SET_MAP_INFO,
      payload: args.mapInfo,
    });
    dispatch({
      type: SET_TILESET_INFO,
      payload: args.tilesetInfo,
    });
    console.log("refreshed project");
  };

  useEffect(() => {
    ipcRenderer.on("engine-stdout", handleEngineStdout);
    ipcRenderer.on("engine-stderr", handleEngineStderr);
    ipcRenderer.on("engine-exit", handleEngineExit);
    ipcRenderer.on("engine-initialized", handleEngineInitialized);
    ipcRenderer.on("error", handleError);
    ipcRenderer.on("selected-project", selectedProject);
    ipcRenderer.on("folders-created", createFolders);
    ipcRenderer.on("map-info", requestMapInfo);
    ipcRenderer.on("tileset-info", requestTileSetInfo);
    ipcRenderer.on("map-created", createMap);
    ipcRenderer.on("project-refreshed", refreshProject);

    return () => {
      ipcRenderer.removeListener("engine-stdout", handleEngineStdout);
      ipcRenderer.removeListener("engine-stderr", handleEngineStderr);
      ipcRenderer.removeListener("engine-exit", handleEngineExit);
      ipcRenderer.removeListener("engine-initialized", handleEngineInitialized);
      ipcRenderer.removeListener("error", handleError);
      ipcRenderer.removeListener("selected-project", selectedProject);
      ipcRenderer.removeListener("folders-created", createFolders);
      ipcRenderer.removeListener("map-info", requestMapInfo);
      ipcRenderer.removeListener("tileset-info", requestTileSetInfo);
      ipcRenderer.removeListener("map-created", createMap);
      ipcRenderer.removeListener("project-refreshed", refreshProject);
    };
  }, []);

  return <div></div>;
};
export default IpcListener;
