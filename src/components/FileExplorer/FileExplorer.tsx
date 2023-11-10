// FileExplorer.tsx

import React, { useState, useEffect } from "react";
import { useProjectContext } from "../../utils/GlobalState.js";
import { SET_PROJECT_DIRECTORY, SET_ERROR } from "../../utils/actions.js";
import RenderFolder from "./renderFolder.js";

const ipcRenderer = window.ipcRenderer;

interface FileExplorerProps {
  initialPath: string;
}

interface File {
  name: string;
  isFolder: boolean;
  children: File[];
}

const FileExplorer: React.FC<FileExplorerProps> = ({ initialPath }) => {
  const [files, setFiles] = useState<File[]>([]);

  const { state, dispatch } = useProjectContext();
  const [width, setWidth] = useState(400);
  const [isResizing, setResizing] = useState(false);

  //New Project
  const createFolders = () => {
    ipcRenderer.send("create-folders");
  };
  ipcRenderer.on("folders-created", (event, folderPath) => {
    dispatch({
      type: SET_PROJECT_DIRECTORY,
      payload: folderPath.name,
    });
    setFiles(folderPath.children);
  });

  // Load Project
  const openFolderDialog = () => {
    ipcRenderer.send("open-folder-dialog");
  };

  ipcRenderer.on("selected-folder", (event, folderPath) => {
    dispatch({
      type: SET_PROJECT_DIRECTORY,
      payload: folderPath.name,
    });
    document.title = folderPath.name;
    setFiles(folderPath.children);
  });

  //Error handling
  ipcRenderer.on("error", (event, err) => {
    dispatch({
      type: SET_ERROR,
      payload: err,
    });
  });

  //Resize Component
  useEffect(() => {
    const handleMouseMove = (e: any) => {
      if (isResizing) {
        let width = window.innerWidth - e.clientX;
        if (width < 150) {
          width = 150;
        }
        setWidth(width);
      }
    };

    const handleMouseUp = () => {
      setResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const handleMouseDown = () => {
    setResizing(true);
  };

  const handleFileSelect = () => {
    //TODO:open editor based on file folder
  };

  return (
    <div
      className='bg-black/80 border-l border-white/25 text-white scroll-active pr-5 text-sm flex flex-row h-full justify-start'
      style={{
        width: `${width}px`,
        minWidth: `max-content`,
        //  display: `${width === 0 ? "none" : ""}`,
      }}
    >
      <div
        style={{
          cursor: "ew-resize",
          height: "100%",
          width: "10px",
          minWidth: "10px",
        }}
        onMouseDown={handleMouseDown}
      ></div>

      <ul className='w-full min-w-max'>
        <div className='py-1 font-bold border-b border-white/25'>
          Project Explorer
        </div>
        {files.length === 0 && (
          <div className='text-xs text-gray-400 px-2 py-1'>
            <button
              className='text-3xl text-white w-full flex justify-start items-center hover:bg-black/70 hover:text-white/80  px-2 py-1 rounded-sm'
              onClick={createFolders}
            >
              Create a new Project
            </button>
            or
            <button
              className='text-3xl text-white w-full flex justify-start items-center hover:bg-black/70 hover:text-white/80 px-2 py-1 rounded-sm'
              onClick={openFolderDialog}
            >
              Load an existing Project
            </button>
          </div>
        )}
        {files.map((file) => (
          <li onClick={() => handleFileSelect()} key={file.name}>
            {RenderFolder(file, 0)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileExplorer;
