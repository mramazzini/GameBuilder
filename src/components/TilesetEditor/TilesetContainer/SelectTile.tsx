import { useTilesetContext } from "../../../utils/TilesetState/TilesetContext";
import { SET_SELECTED_TILE } from "../../../utils/TilesetState/actions";

import { useEffect, useState } from "react";

const SelectTile = () => {
  const { state, dispatch } = useTilesetContext();

  const [periodString, setPeriodString] = useState("");
  const { selectedTileset, selectedTile } = state;

  useEffect(() => {
    const interval = setInterval(() => {
      setPeriodString((periodString) => {
        if (periodString === "...") {
          return "";
        } else {
          return periodString + ".";
        }
      });
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSelectTile = async (e: React.MouseEvent<HTMLDivElement>) => {
    const tile = e.currentTarget.dataset.tile;
    if (tile) {
      await dispatch({ type: SET_SELECTED_TILE, payload: parseInt(tile) });
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const tile = e.currentTarget;
    tile.style.border = `${3}px solid white`;
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const tile = e.currentTarget;
    tile.style.border = "3px solid black";
  };

  return (
    selectedTileset.base64 && (
      <div className='wrapper flex flex-col justify-start items-center w-full'>
        <div
          className='header flex flex-row justify-center items-center w-full 
        font-bold text-xl text-white p-2 border-b border-white/25 rounded-sm bg-black/50'
        >
          Selecting a tile to edit{periodString}
        </div>
        <div
          className='tileset flex flex-row flex-wrap justify-start items-start '
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, 128px)",
            gridAutoRows: "128px",
            gap: "0.5rem",
            padding: "0.5rem",
            overflow: "auto",
            width: "100%",
            height: "100%",
          }}
        >
          {Array.from({ length: selectedTileset.tileCount }).map((_, i) => (
            <div
              key={i}
              className={`tile ${
                selectedTile === i ? "selected" : ""
              } flex flex-row justify-center items-center`}
              data-tile={i}
              onClick={handleSelectTile}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                border: "3px solid black",

                overflow: "hidden",
                width: 128,
                height: 128,
              }}
            >
              <div
                style={{
                  cursor: "pointer",
                  backgroundImage: `url(data:image/png;base64,${selectedTileset.base64})`,
                  width: selectedTileset.tileWidth,
                  height: selectedTileset.tileHeight,
                  backgroundRepeat: "no-repeat",

                  transform: `scale(${128 / selectedTileset.tileWidth}, ${
                    128 / selectedTileset.tileHeight
                  })`,
                  backgroundSize: `${
                    selectedTileset.columns * selectedTileset.tileWidth
                  }px ${selectedTileset.rows * selectedTileset.tileHeight}px`,
                  backgroundPosition: `-${
                    (i % selectedTileset.columns) * selectedTileset.tileWidth
                  }px -${
                    Math.floor(i / selectedTileset.columns) *
                    selectedTileset.tileHeight
                  }px`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default SelectTile;
