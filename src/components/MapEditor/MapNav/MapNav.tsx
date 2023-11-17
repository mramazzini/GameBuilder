import React, { useState, useRef, useEffect } from "react";
import { Tileset, Map, Tile } from "../../../utils/types";
import { useProjectContext } from "../../../utils/GlobalState/GlobalState";
import TileSelector from "./TileSelector";
import MapToggle from "./MapToggle";
import MapSave from "./MapSave";
import MapInfo from "./MapInfo";
import TilePreview from "./TilePreview";
import ColliderInfo from "./ColliderInfo";
import CreateMap from "./CreateMap";

const MapNav = () => {
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
      className='map-nav  bg-black/50 text-white h-full  overflow-ellipsis border-r border-white/25 overflow-hidden flex flex-row justify-between items-start'
      style={{
        width: `${width}px`,
      }}
    >
      <div className='flex flex-col justify-between items-center p-2 overflow-hidden'>
        <MapToggle />
        <TileSelector />

        <TilePreview />
        <ColliderInfo />
        <MapInfo />
        <CreateMap />
        <button
          onClick={() => setSavingMap(true)}
          className='hover:bg-black/70 hover:text-white/80 px-5 py-1 rounded-sm flex justify-center items-center font-bold bg-white/25 text-white border border-white/25 rounded-sm p-1 m-2  px-2 py-1 rounded-sm flex flex-col justify-center items-center'
        >
          Save Map to Project
        </button>
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
      {savingMap && <MapSave setSavingMap={setSavingMap} />}
    </div>
  );
};

export default MapNav;
