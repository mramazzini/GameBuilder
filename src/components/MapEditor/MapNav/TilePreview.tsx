import { useMapContext } from "../../../utils/MapState/MapContext";

const TilePreview = () => {
  const { state } = useMapContext();
  // Displays an image preview of the selected tile

  const scaleFactor = 128 / (state.selectedTileset?.tileWidth || 128);
  return state.selectedTileset ? (
    <div
      className='flex flex-col justify-center items-center h-full border-4 border-black m-4 '
      style={{
        width: `${132}px`,
        height: `${132}px`,
      }}
    >
      <div
        className='tile-preview '
        style={{
          backgroundImage: `url("data:image/png;base64,${state.selectedTileset.base64}")`,
          backgroundPosition: `-${
            state.selectedTileset.tileWidth * (state.selectedTile % 10)
          }px ${
            state.selectedTileset.tileHeight *
            Math.floor(state.selectedTile / 10)
          }px`,
          width: `${state.selectedTileset.tileWidth}px`,
          height: `${state.selectedTileset.tileHeight}px`,

          transform: `scale(${scaleFactor})`,
        }}
      />
    </div>
  ) : (
    ""
  );
};

export default TilePreview;
