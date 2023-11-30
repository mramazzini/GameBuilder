import { createContext, useContext, useReducer } from "react";
import { MapState } from "../types";
import { reducer } from "./reducers";
const initialState = {
  selectedMap: {
    tag: "",
    sizeX: 0,
    sizeY: 0,
    tileset: "",
    layers: [{ tag: "", tiles: [] }],
  },
  selectedTileset: {
    tag: "",
    columns: 0,
    rows: 0,
    tileWidth: 0,
    tileHeight: 0,
    base64: "",
    tileCount: 0,
  },
  selectedLayer: -1,
  undoStack: [],
  selectedTile: -1,
  colliderVision: false,
  addingCollider: false,
};

const MapContext = createContext<{
  state: MapState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});
const { Provider } = MapContext;

const MapProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }} {...props} />;
};

const useMapContext = () => {
  return useContext(MapContext);
};

export { MapProvider, useMapContext };
