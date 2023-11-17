import { useProjectContext } from "../../../utils/GlobalState/GlobalState";
import { useMapContext } from "../MapState/MapContext";
import { Tileset, Map } from "../../../utils/types";

const MapToggle = () => {
  const { state } = useProjectContext();
  const { state: mapState, dispatch } = useMapContext();

  return (
    <div className='tile-selector flex flex-row justify-between items-center p-2 overflow-hidden '>
      <div className='flex flex-row justify-center items-center'>
        <div className='text-sm px-2'>Tileset:</div>
        <select
          className='bg-black/50 text-white/75 border border-white/25 rounded-sm p-1'
          value={mapState.selectedTileset.tag}
          onChange={(e) => {
            const tileset = state.tilesets.find((tileset) => {
              console.log(tileset.tag, e.target.value);
              return tileset.tag === e.target.value;
            });
            dispatch({
              type: "SET_SELECTED_TILESET",
              payload: tileset ? tileset : mapState.selectedTileset,
            });
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
          value={mapState.selectedMap.tag}
          onChange={(e) => {
            const map = state.maps.find((map) => map.tag === e.target.value);
            dispatch({
              type: "SET_SELECTED_MAP",
              payload: map ? map : mapState.selectedMap,
            });
            const tileset = state.tilesets.find(
              (tileset) => tileset.tag === map?.tileset
            );
            dispatch({
              type: "SET_SELECTED_TILESET",
              payload: tileset ? tileset : mapState.selectedTileset,
            });
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
