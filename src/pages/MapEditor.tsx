import React from "react";
import { MapEditorProvider } from "../utils/MapEditorState/MapEditorState";
import TileSetNav from "../components/MapEditor/TilesetNav";
const MapEditor = () => {
  return (
    <div>
      <MapEditorProvider>
        <h1>Map Editor</h1>
      </MapEditorProvider>
    </div>
  );
};

export default MapEditor;
