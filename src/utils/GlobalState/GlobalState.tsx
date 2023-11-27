import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducers";
import { ProjectState } from "../types";
const initialState: ProjectState = {
  projectDirectory: "",
  error: "",
  stdLog: [],
  tilesets: [],
  tilesetPixelData: [],
  maps: [],
  filesAndFolders: {
    name: "",
    isFolder: true,
    children: [],
  },
  history: {
    maps: [],
  },

  fileExplorerOpened: true,
  //default colors
  colors: [
    { r: 0, g: 0, b: 0, a: 1 }, //black
    { r: 255, g: 255, b: 255, a: 1 }, //white
    { r: 255, g: 0, b: 0, a: 1 }, //red
    { r: 0, g: 255, b: 0, a: 1 }, //green
    { r: 0, g: 0, b: 255, a: 1 }, //blue
    { r: 255, g: 255, b: 0, a: 1 }, //yellow
    { r: 255, g: 0, b: 255, a: 1 }, //magenta
    { r: 0, g: 255, b: 255, a: 1 }, //cyan
  ],
};

const ProjectContext = createContext<{
  state: ProjectState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});
const { Provider } = ProjectContext;

const ProjectProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }} {...props} />;
};

const useProjectContext = () => {
  return useContext(ProjectContext);
};

export { ProjectProvider, useProjectContext };
