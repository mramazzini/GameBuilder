import RenderTile from "./RenderTile";

import { useSelector } from "react-redux";
import { MapLayer as MapLayerType } from "../../../utils/types";
import { RootState } from "../../../utils/redux/store";

interface MapLayerProps {
  zoomLevel: number;
  position: { x: number; y: number };
  setCurrentTileHover: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
  layer: MapLayerType;
  fullView: boolean;
}

const MapLayer = ({
  zoomLevel,
  position,
  setCurrentTileHover,
  layer,
  fullView,
}: MapLayerProps) => {
  const state = useSelector((state: RootState) => state.map);

  return (
    <div
      className='grid-container '
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${state.selectedMap?.sizeX || 0}, 1fr)`,
        gridTemplateRows: `repeat(${state.selectedMap?.sizeY || 0}, 1fr)`,

        transform: `scale(${zoomLevel})`,
        width: `${state.selectedMap.sizeX * state.selectedTileset.tileWidth}px`,
        height: `${
          state.selectedMap.sizeY * state.selectedTileset.tileHeight
        }px`,
        gap: "0px",
        position: "absolute",

        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {layer.tiles.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              onMouseEnter={() =>
                setCurrentTileHover({ x: colIndex, y: rowIndex })
              }
            >
              <RenderTile
                tile={col}
                tileSet={state.selectedTileset}
                rowIndex={rowIndex}
                colIndex={colIndex}
                width={state.selectedTileset.tileWidth}
                height={state.selectedTileset.tileHeight}
                colliderVision={state.colliderVision}
                selectedTile={state.selectedTile}
                fullView={fullView}
                collider={state.selectedMap.colliders[rowIndex][colIndex]}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default MapLayer;
