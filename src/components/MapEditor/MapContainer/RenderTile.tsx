import { Tileset } from "../../../utils/types";
import { useRef } from "react";
interface RenderTileProps {
  tile: any;
  rowIndex: number;
  colIndex: number;
  tileSet: Tileset;
  width: number;
  height: number;
  addingCollider: boolean;
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
  addingCollider,
  colliderVision,
  selectedTile,

  fullView,
}: RenderTileProps) => {
  const isHovered = useRef(false);

  const calculateBorder = () => {
    if (isHovered.current) {
      if (addingCollider && colliderVision) {
        return `1px solid red`;
      }
      return `1px solid yellow`;
    }
    if (colliderVision && tile.collider) {
      return `1px solid red`;
    }
    return `none`;
  };

  return tile.srcX !== -1 || tile.srcY !== -1 ? (
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
        border: !fullView ? calculateBorder() : "none",
      }}
      onMouseEnter={() => {
        isHovered.current = fullView ? false : true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
    />
  ) : (
    <div
      key={`tile-${rowIndex}-${colIndex}`}
      className='tile'
      style={{
        display: fullView ? "none" : "grid",
        gap: "0px",
        gridTemplateColumns: `repeat(${2}, 1fr)`,
        gridTemplateRows: `repeat(${2}, 1fr)`,
        width: `${tileSet.tileWidth}px`,
        height: `${tileSet.tileHeight}px`,
        transform: `scale(${width / tileSet.tileWidth}, ${
          height / tileSet.tileHeight
        })`,
        border: !fullView ? calculateBorder() : "none",
        backgroundColor: "rgba(255, 255, 255,1)",
      }}
      onMouseEnter={() => {
        isHovered.current = fullView ? false : true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0, 0, 0.2)",
        }}
      />
      <div
        style={{
          backgroundColor: "rgba(0,0, 0, 0.1)",
        }}
      />
      <div
        style={{
          backgroundColor: "rgba(0,0, 0, 0.1)",
        }}
      />
      <div
        style={{
          backgroundColor: "rgba(0,0, 0, 0.2)",
        }}
      />
    </div>
  );
};

export default RenderTile;
