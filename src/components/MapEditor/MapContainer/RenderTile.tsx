import { Tile, Tileset } from "../../../utils/types";
import { useRef } from "react";
interface RenderTileProps {
  tile: Tile;
  rowIndex: number;
  colIndex: number;
  tileSet: Tileset;
  collider: boolean;
  width: number;
  height: number;

  colliderVision: boolean;
  selectedTile: number;
  fullView: boolean;
}

const RenderTile = ({
  tile,
  rowIndex,
  colIndex,
  tileSet,
  width,
  height,

  colliderVision,
  selectedTile,
  collider,
  fullView,
}: RenderTileProps) => {
  const isHovered = useRef(false);

  const calculateBorder = () => {
    if (isHovered.current) {
      return `1px solid yellow`;
    }
    if (colliderVision && collider) {
      return `1px solid red`;
    }
    return `none`;
  };

  return tile.srcX !== -1 || tile.srcY !== -1 || isHovered.current ? (
    <div
      key={`tile-${rowIndex}-${colIndex}`}
      className='tile'
      style={{
        backgroundImage: `url("data:image/png;base64,${tileSet.base64}")`,

        backgroundPosition: `-${
          (isHovered.current ? selectedTile % tileSet.columns : tile.srcX) *
          tileSet.tileWidth
        }px -${
          (isHovered.current
            ? Math.floor(selectedTile / tileSet.columns)
            : tile.srcY) * tileSet.tileHeight
        }px`,
        width: `${tileSet.tileWidth}px`,
        height: `${tileSet.tileHeight}px`,

        backgroundRepeat: "no-repeat",

        transform: `scale(${width / tileSet.tileWidth}, ${
          height / tileSet.tileHeight
        })`,
        border: calculateBorder(),
      }}
      onMouseEnter={() => {
        console.log("hovered");
        isHovered.current = true;
      }}
      onMouseOut={() => {
        isHovered.current = false;
      }}
    />
  ) : (
    <div
      key={`tile-${rowIndex}-${colIndex}`}
      className='tile'
      style={{
        display: "grid",
        gap: "0px",
        gridTemplateColumns: `repeat(${2}, 1fr)`,
        gridTemplateRows: `repeat(${2}, 1fr)`,
        width: `${tileSet.tileWidth}px`,
        height: `${tileSet.tileHeight}px`,
        transform: `scale(${width / tileSet.tileWidth}, ${
          height / tileSet.tileHeight
        })`,
        border: calculateBorder(),
        backgroundColor: fullView ? "transparent" : "rgba(255, 255, 255,1)",
      }}
      onMouseEnter={() => {
        console.log("hovered");
        isHovered.current = true;
      }}
      onMouseOut={() => {
        isHovered.current = false;
      }}
    >
      <div
        style={{
          display: fullView ? "none" : "block",
          backgroundColor: "rgba(0,0, 0, 0.2)",
        }}
      />
      <div
        style={{
          display: fullView ? "none" : "block",
          backgroundColor: "rgba(0,0, 0, 0.1)",
        }}
      />
      <div
        style={{
          display: fullView ? "none" : "block",
          backgroundColor: "rgba(0,0, 0, 0.1)",
        }}
      />
      <div
        style={{
          display: fullView ? "none" : "block",
          backgroundColor: "rgba(0,0, 0, 0.2)",
        }}
      />
    </div>
  );
};

export default RenderTile;
