import React, { useState, useRef, useEffect } from "react";
import { Tileset, Map } from "../../utils/types";
import { useProjectContext } from "../../utils/GlobalState/GlobalState";
import RenderNavTile from "./RenderNavTile";
interface MapNavProps {
  selectedTileset: Tileset;
  setSelectedTileset: React.Dispatch<React.SetStateAction<Tileset>>;
  setSelectedMap: React.Dispatch<React.SetStateAction<Map>>;
  selectedMap: Map;
  setSelectedTile: React.Dispatch<React.SetStateAction<number>>;
}

const MapNav = ({
  selectedTileset,
  setSelectedTileset,
  setSelectedMap,
  setSelectedTile,
  selectedMap,
}: MapNavProps) => {
  const { state } = useProjectContext();
  const [width, setWidth] = useState(400);
  const [resizing, setResizing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      if (resizing) {
        let width = e.clientX;

        if (width < 100) {
          width = 20;
        }
        setWidth(width);
      }
    };
    const handleMouseUp = () => {
      setResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizing]);

  const handleMouseDown = () => {
    setResizing(true);
  };

  return (
    <div
      className='map-nav  bg-black/50 text-white h-full border-r border-white/25 overflow-hidden flex flex-row justify-between items-start'
      style={{
        width: `${width}px`,
      }}
    >
      <div className='flex flex-col justify-between items-center p-2 overflow-hidden'>
        <div className='tile-selector flex flex-row justify-between items-center p-2 overflow-hidden '>
          <div className='flex flex-row justify-between items-center mx-2'>
            <div className='text-sm'>Tileset</div>
            <select
              className='bg-black/50 text-white/75 border border-white/25 rounded-sm p-1'
              value={selectedTileset.tag}
              onChange={(e) => {
                const tileset = state.tilesets.find((tileset) => {
                  console.log(tileset.tag, e.target.value);
                  return tileset.tag === e.target.value;
                });
                setSelectedTileset(tileset ? tileset : selectedTileset);
              }}
            >
              <option value='NONE'>none</option>
              {state.tilesets.map((tileset, index) => {
                return (
                  <option key={index} value={tileset.tag}>
                    {tileset.tag}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <div className='text-sm'>Map</div>
            <select
              className='bg-black/50 text-white/75 border border-white/25 rounded-sm p-1'
              value={selectedMap.tag}
              onChange={(e) => {
                const map = state.maps.find(
                  (map) => map.tag === e.target.value
                );
                setSelectedMap(map ? map : selectedMap);
              }}
            >
              <option value='NONE'>none</option>
              {state.maps.map((map, index) => {
                return (
                  <option key={index} value={map.tag}>
                    {map.tag}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
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
      <div
        style={{
          cursor: "ew-resize",
          height: "100%",
          width: "10px",
          minWidth: "10px",
        }}
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
};

export default MapNav;
