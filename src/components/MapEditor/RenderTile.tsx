import { Tileset } from "../../utils/types";

const RenderTile = (
  tile: any,
  rowIndex: number,
  colIndex: number,
  tileSet: Tileset,
  width: number,
  height: number,
  toggleColliders: boolean
) => {
  return (
    <div
      key={`tile-${rowIndex}-${colIndex}`}
      className='tile'
      style={{
        backgroundImage: `url("data:image/png;base64,${tileSet.base64}")`,
        backgroundPosition: `-${tile.srcX * tileSet.tileWidth}px ${
          tile.srcY * tileSet.tileHeight
        }px`,
        width: `${tileSet.tileWidth}px`,
        height: `${tileSet.tileHeight}px`,
        backgroundRepeat: "no-repeat",
        transform: `scale(${width / tileSet.tileWidth}, ${
          height / tileSet.tileHeight
        })`,
        border: toggleColliders
          ? tile.collider
            ? `${tileSet.tileWidth / 16}px red solid`
            : ""
          : "",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "red";
        e.currentTarget.style.backgroundImage = `none`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.background = `url("data:image/png;base64,${tileSet.base64}") no-repeat`;
        e.currentTarget.style.backgroundPosition = `-${
          tile.srcX * tileSet.tileWidth
        }px ${tile.srcY * tileSet.tileHeight}px`;
      }}
    />
  );
};

export default RenderTile;
