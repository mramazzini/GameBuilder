import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducers";
import { ProjectState } from "../types";
const initialState: ProjectState = {
  projectDirectory: "",
  error: "",
  stdLog: [],
  tilesets: [],
  maps: [],
  filesAndFolders: {
    name: "",
    isFolder: true,
    children: [],
  },
  history: {
    maps: [],
  },
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
