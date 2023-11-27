import { createContext, useContext, useReducer } from "react";
import { Tile, TilesetState } from "../types";
import { reducer } from "./reducers";
const initialState: TilesetState = {
  selectedTileset: {
    tag: "",
    columns: 0,
    rows: 0,
    tileWidth: 0,
    tileHeight: 0,
    base64: "",
    tileCount: 0,
  },
  selectedTile: -1,
  selectedColor: 0,
};

const TilesetContext = createContext<{
  state: TilesetState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});
const { Provider } = TilesetContext;

const TilesetProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }} {...props} />;
};

const useTilesetContext = () => {
  return useContext(TilesetContext);
};

export { TilesetProvider, useTilesetContext };
