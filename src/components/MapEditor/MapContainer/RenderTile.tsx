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

  return (
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
        isHovered.current = true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
    />
  );
};

export default RenderTile;
