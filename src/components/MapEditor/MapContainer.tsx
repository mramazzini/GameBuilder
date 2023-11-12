import { useProjectContext } from "../../utils/GlobalState/GlobalState";
import { useState, useEffect } from "react";
import { Tileset, Map } from "../../utils/types";
import terrain from "../../assets/tileset_terrain.png";
interface MapContainerProps {
  selectedTileset: Tileset | null;
  setSelectedTileset: React.Dispatch<React.SetStateAction<Tileset | null>>;
  setSelectedMap: React.Dispatch<React.SetStateAction<Map | null>>;
  selectedMap: Map | null;
}

const MapContainer = ({
  selectedTileset,
  setSelectedTileset,
  selectedMap,
  setSelectedMap,
}: MapContainerProps) => {
  const { state } = useProjectContext();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleZoomIn = () => {
    console.log("zoom in");
    // const maxZoom = 2;
    // if (zoomLevel >= maxZoom) return;
    setZoomLevel((prevZoom) => prevZoom + 0.1);
  };
  const handleZoomOut = () => {
    console.log("zoom out");
    const minZoom = 1;
    if (zoomLevel <= minZoom) return;
    setZoomLevel((prevZoom) => Math.max(0.1, prevZoom - 0.1));
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      setPosition((prevPosition) => ({
        x: prevPosition.x + e.movementX,
        y: prevPosition.y + e.movementY,
      }));
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
      className='map-container text-white font-mono w-5/6 overflow-hidden'
      onWheel={handleScroll}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div
        className='grid-container w-1'
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${
            selectedMap?.tiles[0]?.length || 0
          }, 1fr)`,
          gridTemplateRows: `repeat(${selectedMap?.tiles?.length || 0}, 1fr)`,

          transform: `scale(${zoomLevel})`,
          transformOrigin: "top left",
          gap: "0px",
          position: "relative",
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        {selectedMap
          ? selectedMap.tiles.map((row, rowIndex) =>
              row.map((col, colIndex) => renderImage(col, rowIndex, colIndex))
            )
          : "No Map Selected"}
      </div>
    </div>
  );
};
export default MapContainer;

const renderTile = (tile: any, rowIndex: number, colIndex: number) => {
  return (
    <div key={`tile-${rowIndex}-${colIndex}`} className='tile w-5 h-5'>
      {tile.srcY}
      {tile.srcX}
    </div>
  );
};
const renderImage = (tile: any, rowIndex: number, colIndex: number) => {
  return (
    <div
      key={`tile-${rowIndex}-${colIndex}`}
      className='tile '
      style={{
        backgroundImage: `url(${terrain})`,
        backgroundPosition: `-${tile.srcX * 16}px ${tile.srcY * 16}px`,
        width: "16px",
        height: "16px",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};
