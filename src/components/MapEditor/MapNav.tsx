import React, { useState, useRef, useEffect } from "react";
import { Tileset, Map, Tile } from "../../utils/types";
import { useProjectContext } from "../../utils/GlobalState/GlobalState";
import TileSelector from "./TileSelector";
import MapToggle from "./MapToggle";
import MapSave from "./MapSave";
import MapInfo from "./MapInfo";
import TilePreview from "./TilePreview";

const ipcRenderer = window.ipcRenderer;
interface MapNavProps {
  selectedTileset: Tileset;
  setSelectedTileset: React.Dispatch<React.SetStateAction<Tileset>>;
  setSelectedMap: React.Dispatch<React.SetStateAction<Map>>;
  selectedMap: Map;
  setSelectedTile: React.Dispatch<React.SetStateAction<number>>;
  selectedTile: number;
}

const MapNav = ({
  selectedTileset,
  setSelectedTileset,
  setSelectedMap,
  setSelectedTile,
  selectedTile,
  selectedMap,
}: MapNavProps) => {
  const { state } = useProjectContext();
  const [width, setWidth] = useState(400);
  const [resizing, setResizing] = useState(false);
  const [savingMap, setSavingMap] = useState(false);

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
        {" "}
        <MapToggle
          selectedTileset={selectedTileset}
          setSelectedTileset={setSelectedTileset}
          selectedMap={selectedMap}
          setSelectedMap={setSelectedMap}
        />
        <TileSelector
          setSelectedTile={setSelectedTile}
          selectedTileset={selectedTileset}
        />
        <button
          onClick={() => setSavingMap(true)}
          className='bg-white/25 text-white/75 border border-white/25 rounded-sm p-1 m-2 hover:bg-black/70 hover:text-white/80 px-2 py-1 rounded-sm'
        >
          Save Map to Project
        </button>
        <TilePreview tile={selectedTile} tileset={selectedTileset} />
        <MapInfo selectedMap={selectedMap} selectedTileset={selectedTileset} />
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
      {savingMap && (
        <MapSave
          setSavingMap={setSavingMap}
          selectedMap={selectedMap}
          selectedTileset={selectedTileset}
        />
      )}
    </div>
  );
};

export default MapNav;
