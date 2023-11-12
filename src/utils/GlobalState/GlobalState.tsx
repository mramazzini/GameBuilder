import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducers";

interface ProjectState {
  projectDirectory: string;
  error: string;
  stdLog: log[];
}
interface log {
  message: string;
  timestamp: string;
}

const initialState = {
  projectDirectory: "",
  error: "",
  stdLog: [],
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
