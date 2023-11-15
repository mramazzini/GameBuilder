import React from "react";
import { useEffect, useState } from "react";
import { Map, Tileset } from "../utils/types";
import MapNav from "../components/MapEditor/MapNav";
import MapContainer from "../components/MapEditor/MapContainer";
const emptyTile = {
  collider: false,
  srcX: 0,
  srcY: 0,
};
const MapEditor = () => {
  const [selectedTileset, setSelectedTileset] = useState<Tileset>({
    tag: "none",
    tileWidth: 0,
    tileHeight: 0,
    tileCount: 0,
    columns: 0,
    rows: 0,
    base64: "",
  });
  const [selectedMap, setSelectedMap] = useState<Map>({
    sizeX: 0,
    sizeY: 0,
    tag: "No Map Selected",
    tileset: "",
    tiles: [
      [emptyTile, emptyTile, emptyTile, emptyTile],
      [emptyTile, emptyTile, emptyTile, emptyTile],
      [emptyTile, emptyTile, emptyTile, emptyTile],
      [emptyTile, emptyTile, emptyTile, emptyTile],
    ],
  });
  const [selectedTile, setSelectedTile] = useState<number>(-1);
  return (
    <div className='flex flex-row justify-between grow'>
      <MapNav
        selectedTileset={selectedTileset}
        setSelectedTileset={setSelectedTileset}
        setSelectedMap={setSelectedMap}
        selectedMap={selectedMap}
        setSelectedTile={setSelectedTile}
        selectedTile={selectedTile}
      />
      <MapContainer
        selectedTileset={selectedTileset}
        setSelectedTileset={setSelectedTileset}
        setSelectedMap={setSelectedMap}
        selectedMap={selectedMap}
        selectedTile={selectedTile}
      />
    </div>
  );
};

export default MapEditor;
