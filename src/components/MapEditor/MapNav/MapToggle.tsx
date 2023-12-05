import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../utils/redux/store";
import {
  setSelectedLayer,
  setSelectedMap,
  setSelectedTileset,
} from "../../../utils/redux/reducers/MapReducers";

const MapToggle = () => {
  const state = useSelector((state: RootState) => state.global);
  const mapState = useSelector((state: RootState) => state.map);
  const dispatch = useDispatch();

  return (
    <div className='tile-selector flex flex-row justify-between items-center p-2 overflow-hidden '>
      <div className='flex flex-row justify-center items-center '>
        <div className='text-sm px-2'>Tileset:</div>
        <select
          className='bg-black/50 text-white/75 border border-white/25 rounded-sm p-1'
          value={
            mapState.selectedTileset ? mapState.selectedTileset.tag : "NONE"
          }
          onChange={async (e) => {
            const tileset = state.tilesets.find((tileset) => {
              return tileset.tag === e.target.value;
            });

            await dispatch(
              setSelectedTileset(tileset ? tileset : mapState.selectedTileset)
            );
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
          value={mapState.selectedMap ? mapState.selectedMap.tag : "NONE"}
          className='bg-black/50 truncate  w-24 text-white/75 border border-white/25 rounded-sm p-1'
          onChange={async (e) => {
            const map = state.maps.find((map) => map.tag === e.target.value);
            await dispatch(setSelectedMap(map ? map : mapState.selectedMap));
            const tileset = state.tilesets.find(
              (tileset) => tileset.tag === map?.tileset
            );
            await dispatch(
              setSelectedTileset(tileset ? tileset : mapState.selectedTileset)
            );
            await dispatch(setSelectedLayer(-1));
          }}
        >
          <option value='NONE'>none</option>
          {state.maps.map((map, index) => {
            return (
              <option
                key={index}
                value={map.tag}
                className='
            w-24 text-white/75 border border-white/25 rounded-sm p-1
              '
              >
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
