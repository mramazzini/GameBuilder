import React, { useState } from "react";
import { Tileset, Map } from "../../utils/types";
import { useMapEditorContext } from "../../utils/MapEditorState/MapEditorState";
const TilesetNav = () => {
  const [selectedTileset, setSelectedTileset] = useState<Tileset | null>(null);
  const { state } = useMapEditorContext();
  const handleTilesetClick = (tileset: Tileset) => {
    setSelectedTileset(tileset);
  };

  return (
    <div className='tileset-nav'>
      {state.tilesets.map((tileset) => tileset.name)}
    </div>
  );
};

export default TilesetNav;
