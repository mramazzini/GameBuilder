import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducers";

const ProjectContext = createContext({});
const { Provider } = ProjectContext;

const ProjectProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {});

  return <Provider value={[state, dispatch]} {...props} />;
};

const useProjectContext = () => {
  return useContext(ProjectContext);
};

export { ProjectProvider, useProjectContext };
