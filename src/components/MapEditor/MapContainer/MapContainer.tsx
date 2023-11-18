import { useMapContext } from "../MapState/MapContext";
import { useState, useEffect } from "react";
import { Tileset, Map } from "../../../utils/types";

import RenderTile from "./RenderTile";

const MapContainer = () => {
  const [currentTileHover, setCurrentTileHover] = useState<number[]>([8, 8]); // [x,y]
  const { state, dispatch } = useMapContext();

  const [zoomLevel, setZoomLevel] = useState(2);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<{
    dragging: boolean;
    mouseEvent: number;
  }>({ dragging: false, mouseEvent: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        dispatch({
          type: "TOGGLE_COLLIDER_VISION",
          payload: !state.colliderVision,
        });
      }
      if (e.key === "Control") {
        dispatch({
          type: "TOGGLE_ADDING_COLLIDER",
          payload: !state.addingCollider,
        });
      }
      if (e.key === "w") {
        dispatch({
          type: "MOVE_TILE_ROW_UP",
        });
      }
      if (e.key === "s") {
        dispatch({
          type: "MOVE_TILE_ROW_DOWN",
        });
      }
      if (e.key === "a") {
        dispatch({
          type: "MOVE_TILE_COLUMN_LEFT",
        });
      }
      if (e.key === "d") {
        dispatch({
          type: "MOVE_TILE_COLUMN_RIGHT",
        });
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
    const minZoom =
      state.selectedMap.sizeX / state.selectedTileset.tileWidth / 3;
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
        if (state.selectedTile === -1) return;

        const newMap = { ...state.selectedMap };
        let willAddColliderToTile = false;
        if (state.addingCollider && state.colliderVision) {
          willAddColliderToTile = true;
        }
        newMap.tiles[currentTileHover[0]][currentTileHover[1]] = {
          collider: willAddColliderToTile,

          srcX: state.selectedTile % state.selectedTileset.columns,
          srcY: Math.floor(state.selectedTile / state.selectedTileset.columns),
        };

        dispatch({ type: "SET_MAP", payload: newMap });

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
      {state.selectedMap.sizeX === 0 ? (
        <h1 className=' text-white font-bold text-center md:text-3xl lg:text-4xl sm:text-2xl m-5'>
          Select A Map to get started
        </h1>
      ) : (
        <div
          className='grid-container '
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${
              state.selectedMap?.tiles[0]?.length || 0
            }, 1fr)`,
            gridTemplateRows: `repeat(${
              state.selectedMap?.tiles?.length || 0
            }, 1fr)`,

            transform: `scale(${zoomLevel})`,
            width: `${
              state.selectedMap.sizeX * state.selectedTileset.tileWidth
            }px`,
            height: `${
              state.selectedMap.sizeY * state.selectedTileset.tileHeight
            }px`,
            gap: "0px",
            position: "relative",
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          {state.selectedMap.tiles.map((row, rowIndex) =>
            row.map((col, colIndex) => {
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onMouseEnter={() => setCurrentTileHover([rowIndex, colIndex])}
                >
                  <RenderTile
                    tile={col}
                    tileSet={state.selectedTileset}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    width={state.selectedTileset.tileWidth}
                    height={state.selectedTileset.tileHeight}
                    addingCollider={state.addingCollider}
                    colliderVision={state.colliderVision}
                    selectedTile={state.selectedTile}
                  />
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
