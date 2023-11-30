import { Tileset, Map } from "../../../utils/types";
import { useMapContext } from "../../../utils/MapState/MapContext";

const MapInfo = () => {
  const { state } = useMapContext();
  return (
    <div className='flex flex-col justify-between items-center h-full '>
      <div className='flex flex-col justify-center items-end'>
        <div className='flex flex-row justify-between w-60 items-center'>
          <div className='text-white text-sm'>Map: </div>
          <div>{state.selectedMap.tag}</div>
        </div>
        <div className='flex flex-row justify-between w-60 items-center'>
          <div className='text-white text-sm'>Width (Tiles): </div>
          <div>{state.selectedMap.sizeX}</div>
        </div>
        <div className='flex flex-row justify-between w-60 items-center'>
          <div className='text-white text-sm'>Height (Tiles): </div>
          <div>{state.selectedMap.sizeY}</div>
        </div>
        {state.selectedMap.layers[state.selectedLayer] ? (
          <div className='flex flex-row justify-between w-60 items-center'>
            <div className='text-white text-sm'>Layer: </div>
            <div>{state.selectedMap.layers[state.selectedLayer].tag}</div>
          </div>
        ) : null}
        <div className='flex flex-row justify-between w-60 items-center'>
          <div className='text-white text-sm'># of Layers: </div>
          <div>{state.selectedMap.layers.length}</div>
        </div>
        <div className='flex flex-row justify-between w-60 items-center'>
          <div className='text-white text-sm'>Tileset Width : </div>
          <div>{state.selectedTileset.columns}</div>
        </div>
        <div className='flex flex-row justify-between w-60 items-center'>
          <div className='text-white text-sm'>Tileset Height: </div>
          <div>{state.selectedTileset.columns}</div>
        </div>
        <div className='flex flex-row justify-between w-60 items-center'>
          <div className='text-white text-sm'>Tile width (px): </div>
          <div>{state.selectedTileset.tileWidth}</div>
        </div>
        <div className='flex flex-row justify-between w-60 items-center'>
          <div className='text-white text-sm'>Tile height (px): </div>
          <div>{state.selectedTileset.tileHeight}</div>
        </div>
      </div>
    </div>
  );
};

export default MapInfo;
