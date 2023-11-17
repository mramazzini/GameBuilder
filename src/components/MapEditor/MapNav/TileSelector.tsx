import React from "react";
import { Tile, Tileset } from "../../../utils/types";
import RenderNavTile from "./RenderNavTile";
import { useMapContext } from "../MapState/MapContext";

const TileSelector = () => {
  const { state, dispatch } = useMapContext();
  return (
    <div className='flex flex-col justify-between items-center h-full p-3 bg-black/75 w-full border border-white/25 overflow-hidden '>
      <h1 className='text-2xl'>Tile Selector</h1>
      <div
        className='tile-selector  grid-container bg-white'
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${
            state.selectedTileset.columns || 0
          }, 1fr)`,
          gridTemplateRows: `repeat(${state.selectedTileset.rows || 0}, 1fr)`,
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
                className='tile'
                style={{
                  backgroundImage: `url(${state.selectedTileset.base64})`,
                  backgroundPosition: `-${
                    (index % state.selectedTileset.columns) *
                    state.selectedTileset.tileWidth
                  }px -${
                    Math.floor(index / state.selectedTileset.columns) *
                    state.selectedTileset.tileHeight
                  }px`,
                  width: `${16}px`,
                  height: `${16}px`,
                }}
              >
                <div
                  className='tile-reader'
                  style={{ width: "16px", height: "16px" }}
                  onClick={() =>
                    dispatch({ type: "SET_SELECTED_TILE", payload: index })
                  }
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
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TileSelector;
