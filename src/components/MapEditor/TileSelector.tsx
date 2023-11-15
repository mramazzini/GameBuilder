import React from "react";
import { Tile, Tileset } from "../../utils/types";
import RenderNavTile from "./RenderNavTile";
interface TileSelectorProps {
  setSelectedTile: React.Dispatch<React.SetStateAction<number>>;
  selectedTileset: Tileset;
}

const TileSelector = ({
  setSelectedTile,
  selectedTileset,
}: TileSelectorProps) => {
  return (
    <div className='flex flex-col justify-between items-center h-full p-3 bg-black/75 w-full border border-white/25 overflow-hidden '>
      <h1 className='text-2xl'>Tile Selector</h1>
      <div
        className='tile-selector  grid-container bg-white'
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${selectedTileset.columns || 0}, 1fr)`,
          gridTemplateRows: `repeat(${selectedTileset.rows || 0}, 1fr)`,
          gap: "0px",
        }}
      >
        {selectedTileset.base64 !== "" &&
          selectedTileset.columns !== 0 &&
          selectedTileset.rows !== 0 &&
          [...Array(selectedTileset.tileCount)].map((_, index) => {
            return (
              <div
                key={index}
                className='tile'
                style={{
                  backgroundImage: `url(${selectedTileset.base64})`,
                  backgroundPosition: `-${
                    (index % selectedTileset.columns) *
                    selectedTileset.tileWidth
                  }px -${
                    Math.floor(index / selectedTileset.columns) *
                    selectedTileset.tileHeight
                  }px`,
                  width: `${16}px`,
                  height: `${16}px`,
                }}
              >
                <div
                  className='tile-reader'
                  style={{ width: "16px", height: "16px" }}
                  onClick={() => setSelectedTile(index)}
                >
                  {RenderNavTile(
                    {
                      collider: false,
                      srcX: index % selectedTileset.columns,
                      srcY: Math.floor(index / selectedTileset.columns),
                    },
                    index % selectedTileset.columns,
                    Math.floor(index / selectedTileset.columns),
                    selectedTileset
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
