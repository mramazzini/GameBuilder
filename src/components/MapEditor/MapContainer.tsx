import { useProjectContext } from "../../utils/GlobalState/GlobalState";
import { useState, useEffect } from "react";
import { Tileset, Map } from "../../utils/types";

import RenderTile from "./RenderTile";

interface MapContainerProps {
  selectedTileset: Tileset;
  setSelectedTileset: React.Dispatch<React.SetStateAction<Tileset>>;
  setSelectedMap: React.Dispatch<React.SetStateAction<Map>>;
  selectedMap: Map;
  selectedTile: number;
}

const MapContainer = ({
  selectedTileset,
  setSelectedTileset,
  selectedMap,
  selectedTile,
  setSelectedMap,
}: MapContainerProps) => {
  const [currentTileHover, setCurrentTileHover] = useState<number[]>([8, 8]); // [x,y]
  const { state } = useProjectContext();
  const [toggleColliders, setToggleColliders] = useState(false);
  const [toggleColliderRemoval, setToggleColliderRemoval] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(2);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<{
    dragging: boolean;
    mouseEvent: number;
  }>({ dragging: false, mouseEvent: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // use shift to toggle collider view
      console.log(e.key);
      if (e.key === "Shift") {
        setToggleColliders((prev) => !prev);
      }
      if (e.key === "Control") {
        setToggleColliderRemoval((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setPosition({ x: 0, y: 0 });
    setZoomLevel(2);
  }, []);

  const handleZoomIn = () => {
    const maxZoom = 5;
    if (zoomLevel >= maxZoom) return;
    setZoomLevel((prevZoom) => prevZoom + 0.1);
  };
  const handleZoomOut = () => {
    const minZoom = selectedMap.sizeX / selectedTileset.tileWidth / 3;
    if (zoomLevel <= minZoom) return;

    setZoomLevel((prevZoom) => Math.max(0.1, prevZoom - 0.1));
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging({ dragging: true, mouseEvent: e.button });
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging({ dragging: false, mouseEvent: 0 });
    handleMouseMove(e);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging.dragging) {
      //left click
      if (isDragging.mouseEvent === 0) {
        // add tile to map
        if (selectedTile === -1) return;

        const newMap = { ...selectedMap };
        let willAddColliderToTile = false;
        if (toggleColliderRemoval && toggleColliders) {
          willAddColliderToTile = true;
        }
        newMap.tiles[currentTileHover[0]][currentTileHover[1]] = {
          collider: willAddColliderToTile,

          srcX: selectedTile % selectedTileset.columns,
          srcY: Math.floor(selectedTile / selectedTileset.columns),
        };

        setSelectedMap(newMap);

        //middle mouse button click
      } else if (isDragging.mouseEvent === 1) {
        setPosition((prevPosition) => ({
          x: prevPosition.x + e.movementX,
          y: prevPosition.y + e.movementY,
        }));
      }
    }
  };

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    // You can customize the sensitivity of zooming by adjusting the multiplier
    const zoomMultiplier = 0.001;

    if (e.deltaY > 0) {
      handleZoomOut();
    } else {
      handleZoomIn();
    }
  };

  return (
    <div
      className='map-container text-white font-mono w-5/6 overflow-hidden grow '
      onWheel={handleScroll}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {selectedMap.sizeX === 0 ? (
        <h1 className=' text-white font-bold text-center md:text-3xl lg:text-4xl sm:text-2xl m-5'>
          Select A Map to get started
        </h1>
      ) : (
        <div
          className='grid-container '
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${
              selectedMap?.tiles[0]?.length || 0
            }, 1fr)`,
            gridTemplateRows: `repeat(${selectedMap?.tiles?.length || 0}, 1fr)`,

            transform: `scale(${zoomLevel})`,
            width: `${selectedMap.sizeX * selectedTileset.tileWidth}px`,
            height: `${selectedMap.sizeY * selectedTileset.tileHeight}px`,
            gap: "0px",
            position: "relative",
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          {selectedMap.tiles.map((row, rowIndex) =>
            row.map((col, colIndex) => {
              return (
                <div
                  onMouseEnter={() => setCurrentTileHover([rowIndex, colIndex])}
                >
                  {RenderTile(
                    col,
                    rowIndex,
                    colIndex,
                    selectedTileset,
                    selectedTileset.tileWidth,
                    selectedTileset.tileHeight,
                    toggleColliders
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
export default MapContainer;
