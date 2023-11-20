import { Tileset } from "../../../utils/types";

const RenderNavTile = (
  tile: any,
  rowIndex: number,
  colIndex: number,
  tileSet: Tileset,
  selectedTile: boolean
) => {
  return (
    <div
      key={`tile-${rowIndex}-${colIndex}`}
      className='tile flex flex-row justify-center items-center relative'
      style={{
        backgroundImage: `url("data:image/png;base64,${tileSet.base64}")`,
        backgroundPosition: `-${tile.srcX * tileSet.tileWidth}px -${
          tile.srcY * tileSet.tileHeight
        }px`,
        width: `${16}px`,
        height: `${16}px`,
        backgroundRepeat: "no-repeat",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = `2px yellow solid`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = `none`;

        e.currentTarget.style.background = `url("data:image/png;base64,${tileSet.base64}") no-repeat`;
        e.currentTarget.style.backgroundPosition = `-${
          tile.srcX * tileSet.tileWidth
        }px -${tile.srcY * tileSet.tileHeight}px`;
      }}
    >
      <div
        className='selected-tile-circle '
        style={{
          width: `${6}px`,
          height: `${6}px`,
          borderRadius: `${3}px`,
          border: `3px  solid`,
          position: "absolute",
          zIndex: 1,
          display: `${selectedTile ? "block" : "none"}`,
          mixBlendMode: "difference",
        }}
      ></div>
    </div>
  );
};

export default RenderNavTile;
