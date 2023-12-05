import { Tileset } from "../../../utils/types";

const RenderNavTile = (
  tile: any,
  rowIndex: number,
  colIndex: number,
  tileSet: Tileset,
  selectedTile: boolean
) => {
  // Calculate the scaling factors for the background image

  return (rowIndex !== -1 && colIndex !== -1) || selectedTile ? (
    <div className='flex  flex-col justify-center items-center'>
      <div
        className='selected-tile-circle '
        style={{
          width: `6px`,
          height: `6px`,
          borderRadius: `3px`,
          border: `3px  solid`,
          position: "absolute",
          zIndex: 1,
          display: `${selectedTile ? "block" : "none"}`,
          mixBlendMode: "difference",
        }}
      ></div>
      <div
        className='tile-reader'
        style={{
          transform: `scale(${16 / tileSet.tileWidth})`,
        }}
      >
        <div
          key={`tile-${rowIndex}-${colIndex}`}
          className='tile flex flex-row justify-center items-center relative'
          style={{
            backgroundImage: `url("data:image/png;base64,${tileSet.base64}")`,
            backgroundPosition: `-${tile.srcX * tileSet.tileWidth}px -${
              tile.srcY * tileSet.tileHeight
            }px`,
            width: `${tileSet.tileWidth}px`,
            height: `${tileSet.tileHeight}px`,
            backgroundRepeat: "no-repeat",

            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.border =
              2 / (16 / tileSet.tileHeight) > 1
                ? `${2 / (16 / tileSet.tileHeight)}px yellow solid`
                : "none";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.border = `none`;

            e.currentTarget.style.background = `url("data:image/png;base64,${tileSet.base64}") no-repeat`;
            e.currentTarget.style.backgroundPosition = `-${
              tile.srcX * tileSet.tileWidth
            }px -${tile.srcY * tileSet.tileHeight}px`;
          }}
        />
      </div>
    </div>
  ) : (
    <div
      className='tile'
      style={{
        width: `${16}px`,
        height: `${16}px`,
        display: "grid",
        gridTemplateColumns: `repeat(2, 1fr)`,
        gridTemplateRows: `repeat(2, 1fr)`,
        gap: "0px",
      }}
    >
      <div
        className='tile-reader'
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: "grey",
        }}
      />
      <div
        className='tile-reader'
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: "white",
        }}
      />
      <div
        className='tile-reader'
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: "white",
        }}
      />
      <div
        className='tile-reader'
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: "grey",
        }}
      />
    </div>
  );
};

export default RenderNavTile;
