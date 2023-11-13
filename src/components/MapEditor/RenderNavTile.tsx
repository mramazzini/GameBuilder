import { Tileset } from "../../utils/types";

const RenderNavTile = (
  tile: any,
  rowIndex: number,
  colIndex: number,
  tileSet: Tileset
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
        width: `${16}px`,
        height: `${16}px`,
        backgroundRepeat: "no-repeat",
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

export default RenderNavTile;
