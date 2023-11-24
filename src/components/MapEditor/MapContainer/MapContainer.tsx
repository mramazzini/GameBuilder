import { useMapContext } from "../MapState/MapContext";
import { useState, useEffect, useCallback } from "react";
import MapContainerMouseListener from "./MapContainerMouseListener";
import { useProjectContext } from "../../../utils/GlobalState/GlobalState";
import MapContainerKeyListener from "./MapContainerKeyListener";
import RenderTile from "./RenderTile";
let mouseListener: MapContainerMouseListener;
const MapContainer = () => {
  const [currentTileHover, setCurrentTileHover] = useState<number[]>([8, 8]); // [x,y]
  const { state, dispatch } = useMapContext();
  const { state: projectState, dispatch: projectDispatch } =
    useProjectContext();
  const [beenPlaced, setBeenPlaced] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState(2);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<{
    dragging: boolean;
    mouseEvent: number;
  }>({ dragging: false, mouseEvent: 0 });
  const keydownListener = (e: KeyboardEvent) => {
    MapContainerKeyListener(e, dispatch, state, projectDispatch);
  };
  useEffect(() => {
    console.log("adding keydown listener");
    document.addEventListener("keydown", keydownListener);
    return () => {
      document.removeEventListener("keydown", keydownListener);
      console.log("removed keydown listener");
    };
  }, [state.selectedMap]);

  useEffect(() => {
    mouseListener = new MapContainerMouseListener(
      dispatch,
      projectDispatch,
      setBeenPlaced,
      setPosition,
      setIsDragging,
      setZoomLevel
    );
  }, []);

  return (
    <div
      className='map-container text-white font-mono  overflow-hidden grow '
      onWheel={(e) => mouseListener.handleScroll(e, state, zoomLevel)}
      onMouseDown={(e) => mouseListener.handleMouseDown(e)}
      onMouseUp={(e) =>
        mouseListener.handleMouseUp(e, isDragging, state, currentTileHover)
      }
      onMouseMove={(e) =>
        mouseListener.handleMouseMove(e, isDragging, state, currentTileHover)
      }
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
