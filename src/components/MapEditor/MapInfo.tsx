import { Tileset, Map } from "../../utils/types";
interface MapInfoProps {
  selectedTileset: Tileset;
  selectedMap: Map;
}
const MapInfo = ({ selectedMap, selectedTileset }: MapInfoProps) => {
  return (
    <div className='flex flex-col justify-between items-center h-full '>
      <div className='flex flex-col justify-center items-end'>
        <div className='flex flex-row justify-between w-60 items-center'>
          <div className='text-white text-sm'>Map: </div>
          <div>{selectedMap.tag}</div>
        </div>

        <div className='flex flex-row justify-between w-60 items-center'>
          <div className='text-white text-sm'>Width (Tiles): </div>
          <div>{selectedMap.sizeX}</div>
        </div>
        <div className='flex flex-row justify-between w-60 items-center'>
          <div className='text-white text-sm'>Height (Tiles): </div>
          <div>{selectedMap.sizeY}</div>
        </div>
        <div className='flex flex-row justify-between w-60 items-center'>
          <div className='text-white text-sm'>Tileset Width : </div>
          <div>{selectedTileset.columns}</div>
        </div>
        <div className='flex flex-row justify-between w-60 items-center'>
          <div className='text-white text-sm'>Tileset Height: </div>
          <div>{selectedTileset.columns}</div>
        </div>
        <div className='flex flex-row justify-between w-60 items-center'>
          <div className='text-white text-sm'>Tile width (px): </div>
          <div>{selectedTileset.tileWidth}</div>
        </div>
        <div className='flex flex-row justify-between w-60 items-center'>
          <div className='text-white text-sm'>Tile height (px): </div>
          <div>{selectedTileset.tileHeight}</div>
        </div>
      </div>
    </div>
  );
};

export default MapInfo;
