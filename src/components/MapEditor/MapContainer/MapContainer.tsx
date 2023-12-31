import { useState, useEffect, useRef } from "react";
import MapContainerMouseListener from "./MapContainerMouseListener";
import { RootState } from "../../../utils/redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedMap,
  setSelectedTileset,
} from "../../../utils/redux/reducers/MapReducers";
import MapContainerKeyListener from "./MapContainerKeyListener";
import MapLayer from "./MapLayer";

let mouseListener: MapContainerMouseListener;
const MapContainer = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [currentTileHover, setCurrentTileHover] = useState<{
    x: number;
    y: number;
  }>({ x: 8, y: 8 }); // [x,y]
  const state = useSelector((state: RootState) => state.map);
  const projectState = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch();

  const [zoomLevel, setZoomLevel] = useState<number>();
  const [position, setPosition] = useState<{ x: number; y: number }>();
  const [isDragging, setIsDragging] = useState<{
    dragging: boolean;
    mouseEvent: number;
  }>({ dragging: false, mouseEvent: 0 });

  const keydownListener = (e: KeyboardEvent) => {
    MapContainerKeyListener(e, dispatch, state);
  };
  useEffect(() => {
    console.log("adding keydown listener");
    document.addEventListener("keydown", keydownListener);

    return () => {
      document.removeEventListener("keydown", keydownListener);
      console.log("removed keydown listener");
    };
  }, [state.selectedMap?.tag, state.selectedTileset?.tag, state.selectedLayer]);

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
  }, [state.selectedMap?.tag, state.selectedTileset?.tag, state.selectedLayer]);

  useEffect(() => {
    mouseListener = new MapContainerMouseListener(
      dispatch,

      setPosition,
      setIsDragging,
      setZoomLevel
    );
  }, []);

  useEffect(() => {
    //set default map and tileset

    if (projectState.maps.length > 0) {
      dispatch(setSelectedMap(projectState.maps[0]));
    }
    if (projectState.tilesets.length > 0) {
      dispatch(setSelectedTileset(projectState.tilesets[0]));
    }
  }, [projectState.tilesets, projectState.maps]);
  return state.selectedTileset && state.selectedMap ? (
    <div
      className='map-container text-white font-mono flex overflow-hidden grow '
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
      ) : state.selectedLayer !== -1 ? (
        <div style={{ position: "relative" }}>
          {/*Render selected layer and all layers behind it */}
          {state.selectedMap.layers.map((layer, i) => {
            if (i <= state.selectedLayer) {
              return (
                <MapLayer
                  layer={layer}
                  key={i}
                  zoomLevel={zoomLevel || 1}
                  position={position || { x: 0, y: 0 }}
                  setCurrentTileHover={setCurrentTileHover}
                  fullView={true}
                />
              );
            }
          })}
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          {state.selectedMap.layers.map((layer, i) => {
            return (
              <MapLayer
                layer={layer}
                key={i}
                zoomLevel={zoomLevel || 1}
                position={position || { x: 0, y: 0 }}
                setCurrentTileHover={setCurrentTileHover}
                fullView={true}
              />
            );
          })}
        </div>
      )}
    </div>
  ) : (
    ""
  );
};
export default MapContainer;
