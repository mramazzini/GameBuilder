import TitleDropdownMenu from "./TitleDropdownMenu";
import Logo from "../assets/Logo.png";
import { useCallback } from "react";
const ipcRenderer = window.ipcRenderer;

import { useSelector, useDispatch } from "react-redux";
import {
  setProjectDirectory,
  setError,
} from "../utils/redux/reducers/GlobalReducers";
import { RootState } from "../utils/redux/store";
const TitleBar = () => {
  const state = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch();

  // Window Controls -----------------------------------------------------------
  const maximize = () => {
    window.resizeTo(screen.availWidth, screen.availHeight);
  };
  const minimize = () => {
    window.resizeTo(400, 300);
  };
  const close = () => {
    window.close();
  };
  // ---------------------------------------------------------------------------

  // New Project ---------------------------------------------------------------

  const createFolders = useCallback(() => {
    ipcRenderer.send("create-folders");
  }, []);

  // ---------------------------------------------------------------------------

  // Load Project --------------------------------------------------------------

  const openFolderDialog = useCallback(() => {
    ipcRenderer.send("select-project");
  }, []);
  // ---------------------------------------------------------------------------

  //Run Project

  const runProjectGame = async () => {
    if (state.projectDirectory === "") {
      await dispatch(setError("Please create or load a project first"));

      return;
    }
    ipcRenderer.send("initialize-engine", state.projectDirectory);
  };

  // ---------------------------------------------------------------------------

  return (
    <div
      className='title-bar  flex justify-between  items-center bg-black/80 text-white text-sm font-semibold plx-4
       h-9 w-full  border-b border-white/75'
      id='title-bar'
    >
      <div className='title-bar-controls bg-black/50  flex h-full'>
        <img src={Logo} className='w-5 mx-2 my-2' />
        <TitleDropdownMenu
          options={[
            { name: "New Project", action: createFolders },
            {
              name: "Load Project",
              action: openFolderDialog,
            },
          ]}
          header='File'
        />
        <TitleDropdownMenu
          options={[
            { name: "Import Map File", action: () => {} },
            { name: "Import Tileset", action: () => {} },
          ]}
          header='Import'
        />
        <TitleDropdownMenu
          options={[
            {
              name: "Run Project",
              action: runProjectGame,
            },
            {
              name: "Run Project with Debugging",
              action: () => {},
            },
          ]}
          header='Run'
        />
      </div>
      <div
        className='title-bar-title bg-black/50  text-center  flex-grow h-full flex items-center justify-center'
        id='title-bar-draggable'
      >
        {document.title ? document.title : "Untitled"}
      </div>
      <div className='title-bar-window-controls bg-black/50 h-full flex justify-end '>
        <button
          className='hover:bg-gray-400 hover:text-black hover:font-bold px-2 py-1 '
          aria-label='Minimize'
          onClick={minimize}
        >
          -
        </button>
        <button
          aria-label='Maximize'
          className='hover:bg-gray-400 hover:text-black hover:font-bold px-2 py-1 '
          onClick={maximize}
          id='maximizeButton'
        >
          +
        </button>
        <button
          className='hover:bg-gray-400 hover:text-black hover:font-bold px-2 py-1 '
          aria-label='Close'
          onClick={close}
        >
          X
        </button>
      </div>
    </div>
  );
};
export default TitleBar;
