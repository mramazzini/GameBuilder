import React, { useState } from "react";
import { Tileset, Map } from "../../utils/types";
import { useProjectContext } from "../../utils/GlobalState/GlobalState";

interface MapNavProps {
  selectedTileset: Tileset | null;
  setSelectedTileset: React.Dispatch<React.SetStateAction<Tileset | null>>;
  setSelectedMap: React.Dispatch<React.SetStateAction<Map | null>>;
  selectedMap: Map | null;
}

const MapNav = ({
  selectedTileset,
  setSelectedTileset,
  setSelectedMap,
  selectedMap,
}: MapNavProps) => {
  const { state } = useProjectContext();
  const handleTilesetClick = (tileset: Tileset) => {
    setSelectedTileset(tileset);
  };

  return (
    <div className='map-nav w-1/6 bg-black/50 text-white h-full border-r border-white/25'>
      {state.maps.map((map, index) => {
        return (
          <div
            className='map-nav-item'
            onClick={() => setSelectedMap(map)}
            key={index}
          >
            {map.sizeX}
          </div>
        );
      })}
      <button onClick={() => setSelectedMap(null)}>Back</button>
    </div>
  );
};

export default MapNav;
