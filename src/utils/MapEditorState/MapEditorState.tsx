import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducers";
import { Map, Tileset } from "../types";
interface MapEditorState {
  tilesets: Tileset[];
  maps: Map[];
}

const initialState = {
  tilesets: [],
  maps: [],
};

const MapEditorContext = createContext<{
  state: MapEditorState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});
const { Provider } = MapEditorContext;

const MapEditorProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }} {...props} />;
};

const useMapEditorContext = () => {
  return useContext(MapEditorContext);
};

export { MapEditorProvider, useMapEditorContext };
