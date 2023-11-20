import { useTilesetContext } from "../TilesetState/TilesetContext";

const TileEditor = ({ tileNum }: { tileNum: number }) => {
  const { state } = useTilesetContext();

  return (
    <div className='tile-editor w-full h-full'>
      <div
        className='tile-editor__tile'
        style={{
          width: state.selectedTileset.tileWidth,
          height: state.selectedTileset.tileHeight,
          objectFit: "none",
          objectPosition: `-${
            (tileNum % state.selectedTileset.columns) *
            state.selectedTileset.tileWidth
          }px -${
            Math.floor(tileNum / state.selectedTileset.columns) *
            state.selectedTileset.tileHeight
          }px`,
        }}
      >
        <img
          src={`data:image/png;base64,${state.selectedTileset.base64}`}
          alt=''
          style={{
            width: state.selectedTileset.tileWidth,
            height: state.selectedTileset.tileHeight,
            objectFit: "none",
            objectPosition: `-${
              (tileNum % state.selectedTileset.columns) *
              state.selectedTileset.tileWidth
            }px -${
              Math.floor(tileNum / state.selectedTileset.columns) *
              state.selectedTileset.tileHeight
            }px`,
          }}
        />
      </div>
    </div>
  );
};

export default TileEditor;
