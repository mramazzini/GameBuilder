const ipcRenderer = window.ipcRenderer;
import { useEffect } from "react";
import {
  ADD_STD_TO_LOG,
  SET_PROJECT_DIRECTORY,
  SET_ERROR,
} from "./GlobalState/actions";
import { useProjectContext } from "./GlobalState/GlobalState";
const textDecoder = new TextDecoder("utf-8");

const decode = (data: any) => {
  return textDecoder.decode(data);
};

const IpcListener = () => {
  const { state, dispatch } = useProjectContext();
  useEffect(() => {
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
    const openFolderDialog = (
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
    };

    const handleError = (event: any, err: any) => {
      //Error handling

      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    };

    ipcRenderer.on("engine-stdout", handleEngineStdout);
    ipcRenderer.on("engine-stderr", handleEngineStderr);
    ipcRenderer.on("engine-exit", handleEngineExit);
    ipcRenderer.on("engine-initialized", handleEngineInitialized);
    ipcRenderer.on("error", handleError);
    ipcRenderer.on("selected-folder", openFolderDialog);
    ipcRenderer.on("folders-created", createFolders);
    return () => {
      ipcRenderer.removeListener("engine-stdout", handleEngineStdout);
      ipcRenderer.removeListener("engine-stderr", handleEngineStderr);
      ipcRenderer.removeListener("engine-exit", handleEngineExit);
      ipcRenderer.removeListener("engine-initialized", handleEngineInitialized);
      ipcRenderer.removeListener("error", handleError);
    };
  }, []);

  return <div></div>;
};
export default IpcListener;
