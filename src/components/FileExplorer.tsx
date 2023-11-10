// FileExplorer.tsx

import React, { useState, useEffect } from "react";
import { useProjectContext } from "../utils/GlobalState.jsx";
import { SET_PROJECT_DIRECTORY } from "../utils/actions";

const ipcRenderer = window.ipcRenderer;

interface FileExplorerProps {
  initialPath: string;
}

interface File {
  name: string;
  isFolder: boolean;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ initialPath }) => {
  const [files, setFiles] = useState<File[]>([]);
  const { state, dispatch } = useProjectContext();
  const openFolderDialog = () => {
    ipcRenderer.send("open-folder-dialog");
  };

  // Listen for the selected folder from the main process
  ipcRenderer.on("selected-folder", (event, folderPath) => {
    dispatch({
      type: SET_PROJECT_DIRECTORY,
      payload: folderPath.name,
    });
    setFiles(folderPath.children);
  });

  return (
    <div className='bg-black/80 border-l border-white/25 text-white '>
      <button onClick={openFolderDialog}>Open Folder</button>
      <div>Selected Folder: {state.projectDirectory}</div>
      <ul>
        {files.map((file) => (
          <li key={file.name}>
            {file.isFolder ? (
              <strong>{file.name}</strong>
            ) : (
              <span>{file.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileExplorer;
