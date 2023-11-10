import TitleDropdownMenu from "./TitleDropdownMenu";
import Logo from "../assets/Logo.png";
const ipcRenderer = window.ipcRenderer;
import { SET_PROJECT_DIRECTORY } from "../utils/actions";

import { useProjectContext } from "../utils/GlobalState";

const TitleBar = () => {
  const { state, dispatch } = useProjectContext();

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

  const createFolders = () => {
    ipcRenderer.send("create-folders");
  };
  ipcRenderer.on("folders-created", (event, folderPath) => {
    dispatch({
      type: SET_PROJECT_DIRECTORY,
      payload: folderPath.name,
    });
  });

  // ---------------------------------------------------------------------------

  // Load Project --------------------------------------------------------------

  ipcRenderer.on("selected-folder", (event, folderPath) => {
    dispatch({
      type: SET_PROJECT_DIRECTORY,
      payload: folderPath.name,
    });
  });
  const openFolderDialog = () => {
    ipcRenderer.send("open-folder-dialog");
  };
  // ---------------------------------------------------------------------------

  return (
    <div
      className='title-bar flex justify-between items-center bg-black/80 text-white text-sm font-semibold plx-4 py-5 w-full h-7 border-b border-white/25'
      id='title-bar'
    >
      <img src={Logo} className='w-6 mx-2 h-6' />
      <div className='title-bar-controls flex w-1/3 '>
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
              action: () => {},
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
        className='title-bar-title w-1/3 text-center'
        id='title-bar-draggable'
      >
        {document.title ? document.title : "Untitled"}
      </div>
      <div className='title-bar-window-controls flex justify-end w-1/3 '>
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
