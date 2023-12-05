const ipcRenderer = window.ipcRenderer;
import { useEffect } from "react";

import {
  addSTDToLog,
  setProjectDirectory,
  setError,
  setFilesAndFolders,
  setMapInfo,
  setTilesetInfo,
} from "./redux/reducers/GlobalReducers";
import { useDispatch } from "react-redux";

const textDecoder = new TextDecoder("utf-8");

const decode = (data: any) => {
  return textDecoder.decode(data);
};

const IpcListener = () => {
  const dispatch = useDispatch();

  const handleEngineStdout = async (event: any, data: any) => {
    const decodedData = decode(data);
    // Update state asynchronously without triggering immediate rerender
    await dispatch(addSTDToLog(decodedData));
  };

  const handleEngineStderr = async (event: any, data: any) => {
    const decodedData = decode(data);
    // Update state asynchronously without triggering immediate rerender
    await dispatch(addSTDToLog(decodedData));
  };

  const handleEngineExit = (event: any, data: any) => {
    // Handle engine exit if needed
  };

  const handleEngineInitialized = (event: any, data: any) => {
    // Handle engine initialization if needed
  };
  const selectedProject = async (
    event: any,
    {
      selectedFolderPath,
      filesAndFolders,
    }: { selectedFolderPath: string; filesAndFolders: any }
  ) => {
    await dispatch(setProjectDirectory(selectedFolderPath));
    await dispatch(setFilesAndFolders(filesAndFolders));
  };

  const createFolders = async (
    event: any,
    {
      selectedFolderPath,
      filesAndFolders,
    }: { selectedFolderPath: string; filesAndFolders: any }
  ) => {
    await dispatch(setProjectDirectory(selectedFolderPath));
    await dispatch(setFilesAndFolders(filesAndFolders));
  };

  const handleError = async (event: any, err: any) => {
    //Error handling
    await dispatch(setError(err));
  };
  const requestMapInfo = async (event: any, mapInfo: any) => {
    await dispatch(setMapInfo(mapInfo));
  };

  const requestTileSetInfo = async (event: any, tileSetInfo: any) => {
    await dispatch(setTilesetInfo(tileSetInfo));
  };
  const createMap = async (event: any, args: any) => {
    if (args.success) {
      await dispatch(setMapInfo(args.mapInfo));
    }
  };
  const refreshProject = async (event: any, args: any) => {
    console.log("refreshing project");
    await dispatch(setFilesAndFolders(args.filesAndFolders));
    await dispatch(setMapInfo(args.mapInfo));
    await dispatch(setTilesetInfo(args.tilesetInfo));

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
