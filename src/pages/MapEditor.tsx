import React from "react";
import { useEffect, useState } from "react";
import { Map, Tileset } from "../utils/types";
import MapNav from "../components/MapEditor/MapNav";
import MapContainer from "../components/MapEditor/MapContainer";
const MapEditor = () => {
  const [selectedTileset, setSelectedTileset] = useState<Tileset | null>(null);
  const [selectedMap, setSelectedMap] = useState<Map | null>(null);
  return (
    <div className='flex flex-row justify-between grow'>
      <MapNav
        selectedTileset={selectedTileset}
        setSelectedTileset={setSelectedTileset}
        setSelectedMap={setSelectedMap}
        selectedMap={selectedMap}
      />
      <MapContainer
        selectedTileset={selectedTileset}
        setSelectedTileset={setSelectedTileset}
        setSelectedMap={setSelectedMap}
        selectedMap={selectedMap}
      />
    </div>
  );
};

export default MapEditor;
