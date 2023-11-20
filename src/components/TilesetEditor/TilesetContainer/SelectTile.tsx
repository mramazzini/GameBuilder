import { useTilesetContext } from "../TilesetState/TilesetContext";
import { SET_SELECTED_TILE } from "../TilesetState/actions";

const SelectTile = () => {
  const { state, dispatch } = useTilesetContext();
  const { selectedTileset, selectedTile } = state;

  const handleSelectTile = (e: React.MouseEvent<HTMLDivElement>) => {
    const tile = e.currentTarget.dataset.tile;
    if (tile) {
      dispatch({ type: SET_SELECTED_TILE, payload: parseInt(tile) });
    }
  };

  return (
    selectedTileset.base64 && (
      <div className='tileset'>
        {Array.from({ length: selectedTileset.tileCount }).map((_, i) => (
          <div
            key={i}
            className={`tile ${selectedTile === i ? "selected" : ""}`}
            data-tile={i}
            onClick={handleSelectTile}
          >
            asdasd
            <img
              src={`data:image/png;base64,${selectedTileset.base64}`}
              alt=''
              style={{
                width: selectedTileset.tileWidth,
                height: selectedTileset.tileHeight,
                objectFit: "none",
                objectPosition: `-${
                  (i % selectedTileset.columns) * selectedTileset.tileWidth
                }px -${
                  Math.floor(i / selectedTileset.columns) *
                  selectedTileset.tileHeight
                }px`,
              }}
            />
          </div>
        ))}
      </div>
    )
  );
};

export default SelectTile;
