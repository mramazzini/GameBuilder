import RenderNavTile from "./RenderNavTile";
import { setSelectedTile } from "../../../utils/redux/reducers/MapReducers";
import { RootState } from "../../../utils/redux/store";
import { useSelector, useDispatch } from "react-redux";
const TileSelector = () => {
  const state = useSelector((state: RootState) => state.map);
  const dispatch = useDispatch();
  const getArray = (length: number) => {
    console.log(length);
    return [...Array(length)];
  };
  return state.selectedTileset ? (
    <div className='flex flex-col justify-between items-center h-full p-3 bg-black/75 w-full border border-white/25 overflow-hidden '>
      <h1 className='text-2xl'>Tile Selector</h1>
      <div
        className='tile-selector  grid-container bg-white'
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${state.selectedTileset.columns}, 1fr)`,
          gridTemplateRows: `repeat(${state.selectedTileset.rows}, 1fr)`,
          gap: "0px",
        }}
      >
        {state.selectedTileset.base64 !== "" &&
          state.selectedTileset.columns !== 0 &&
          state.selectedTileset.rows !== 0 &&
          [...Array(state.selectedTileset.tileCount)].map((_, index) => {
            return (
              <div
                key={index}
                className='tile flex flex-row justify-center items-center w-full h-full'
                style={{
                  width: `${16}px`,
                  height: `${16}px`,
                }}
                onClick={async () => await dispatch(setSelectedTile(index))}
              >
                {RenderNavTile(
                  {
                    collider: false,
                    srcX: index % state.selectedTileset.columns,
                    srcY: Math.floor(index / state.selectedTileset.columns),
                  },
                  index % state.selectedTileset.columns,
                  Math.floor(index / state.selectedTileset.columns),
                  state.selectedTileset,
                  state.selectedTile === index ? true : false
                )}
              </div>
            );
          })}
        {/*Render placeholder tiles to fill row */}
        {state.selectedTileset.tileCount !== 0 &&
          getArray(
            state.selectedTileset.columns -
              (state.selectedTileset.tileCount % state.selectedTileset.columns)
          ).map((_, index) => {
            return (
              <div
                key={index}
                className='tile flex flex-row justify-center items-center w-full h-full'
                style={{
                  width: `${16}px`,
                  height: `${16}px`,
                }}
              >
                {RenderNavTile(
                  {
                    collider: false,
                    srcX: -1,
                    srcY: -1,
                  },
                  -1,
                  -1,
                  state.selectedTileset,
                  false
                )}
              </div>
            );
          })}
      </div>
    </div>
  ) : (
    ""
  );
};

export default TileSelector;
