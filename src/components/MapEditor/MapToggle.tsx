import { useProjectContext } from "../../utils/GlobalState/GlobalState";

import { Tileset, Map } from "../../utils/types";
interface MapToggleProps {
  selectedTileset: Tileset;
  setSelectedTileset: React.Dispatch<React.SetStateAction<Tileset>>;
  selectedMap: Map;
  setSelectedMap: React.Dispatch<React.SetStateAction<Map>>;
}

const MapToggle = ({
  selectedTileset,
  setSelectedTileset,
  selectedMap,
  setSelectedMap,
}: MapToggleProps) => {
  const { state } = useProjectContext();

  return (
    <div className='tile-selector flex flex-row justify-between items-center p-2 overflow-hidden '>
      <div className='flex flex-row justify-center items-center'>
        <div className='text-sm px-2'>Tileset:</div>
        <select
          className='bg-black/50 text-white/75 border border-white/25 rounded-sm p-1'
          value={selectedTileset.tag}
          onChange={(e) => {
            const tileset = state.tilesets.find((tileset) => {
              console.log(tileset.tag, e.target.value);
              return tileset.tag === e.target.value;
            });
            setSelectedTileset(tileset ? tileset : selectedTileset);
          }}
        >
          <option value='NONE'>none</option>
          {state.tilesets.map((tileset, index) => {
            return (
              <option key={index} value={tileset.tag}>
                {tileset.tag}
              </option>
            );
          })}
        </select>
      </div>
      <div className='flex flex-row justify-between items-center'>
        <div className='text-sm px-2'>Map: </div>
        <select
          className='bg-black/50 text-white/75 border border-white/25 rounded-sm p-1'
          value={selectedMap.tag}
          onChange={(e) => {
            const map = state.maps.find((map) => map.tag === e.target.value);
            setSelectedMap(map ? map : selectedMap);
            setSelectedTileset(
              state.tilesets.find((tileset) => tileset.tag === map?.tileset) ||
                selectedTileset
            );
          }}
        >
          <option value='NONE'>none</option>
          {state.maps.map((map, index) => {
            return (
              <option key={index} value={map.tag}>
                {map.tag}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default MapToggle;
