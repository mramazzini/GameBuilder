import { useMapContext } from "../../../utils/MapState/MapContext";
import { useState, useEffect, useRef } from "react";
import MapContainerMouseListener from "./MapContainerMouseListener";
import { useProjectContext } from "../../../utils/GlobalState/GlobalState";
import MapContainerKeyListener from "./MapContainerKeyListener";
import RenderTile from "./RenderTile";
import {
  SET_SELECTED_MAP,
  SET_SELECTED_TILESET,
} from "../../../utils/MapState/actions";
let mouseListener: MapContainerMouseListener;
const MapContainer = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [currentTileHover, setCurrentTileHover] = useState<number[]>([8, 8]); // [x,y]
  const { state, dispatch } = useMapContext();
  const { state: projectState, dispatch: projectDispatch } =
    useProjectContext();
  const [beenPlaced, setBeenPlaced] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>();
  const [position, setPosition] = useState<{ x: number; y: number }>();
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
    if (mapContainerRef.current) {
      const containerWidth = mapContainerRef.current.clientWidth;
      const containerHeight = mapContainerRef.current.clientHeight;

      setZoomLevel(16 / state.selectedTileset.tileWidth);

      setPosition({
        x:
          containerWidth / 2 -
          (state.selectedMap.sizeX * state.selectedTileset.tileWidth) / 2,
        y:
          containerHeight / 2 -
          (state.selectedMap.sizeY * state.selectedTileset.tileHeight) / 2,
      });
    }
  }, [state.selectedMap, state.selectedTileset]);

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

  useEffect(() => {
    //set default map and tileset
    console.log(projectState.maps);
    if (projectState.maps.length > 0) {
      dispatch({
        type: SET_SELECTED_MAP,
        payload: projectState.maps[0],
      });
    }
    if (projectState.tilesets.length > 0) {
      dispatch({
        type: SET_SELECTED_TILESET,
        payload: projectState.tilesets[0],
      });
    }
  }, [projectState.tilesets, projectState.maps]);
  return (
    <div
      className='map-container text-white font-mono  overflow-hidden grow '
      ref={mapContainerRef}
      onWheel={(e) => mouseListener.handleScroll(e, state, zoomLevel || 1)}
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

            left: `${position ? position.x : 0}px`,
            top: `${position ? position.y : 0}px`,
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
