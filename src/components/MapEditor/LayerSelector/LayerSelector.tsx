import { useMapContext } from "../../../utils/MapState/MapContext";
import { useProjectContext } from "../../../utils/GlobalState/GlobalState";
import {
  SET_SELECTED_LAYER,
  SET_SELECTED_MAP,
} from "../../../utils/MapState/actions";
import { ADD_MAP_LAYER } from "../../../utils/GlobalState/actions";
import { useEffect } from "react";
const LayerSelector = () => {
  const { state: projectState, dispatch: projectDispatch } =
    useProjectContext();
  const { state, dispatch } = useMapContext();

  const handleLayerChange = (num: number) => {
    dispatch({
      type: SET_SELECTED_LAYER,
      payload: num,
    });
  };
  const handleAddLayer = async () => {
    await projectDispatch({
      type: ADD_MAP_LAYER,
      payload: state.selectedMap.tag,
    });
    await dispatch({
      type: SET_SELECTED_MAP,
      payload:
        projectState.maps.find((map) => map.tag === state.selectedMap.tag) ||
        state.selectedMap,
    });
    await dispatch({
      type: SET_SELECTED_LAYER,
      payload: state.selectedMap.layers.length,
    });
  };

  return (
    <div
      className='layer-selector-container 
       flex flex-row justify-start items-center w-full bg-black/50 border-b 
       border-white/25 rounded-sm h-8 overflow-x-auto 

    '
    >
      <button
        className='layer-selector flex flex-row justify-start items-center
        bg-black/50   rounded-sm p-1  px-2 py-1 rounded-sm border-r border-white/25
         flex flex-col justify-center items-center w-24 bg-black/50 
           hover:bg-black/70 hover:text-white/80  text-white/75 h-full truncate'
        onClick={() => handleLayerChange(-1)}
        style={{
          backgroundColor: `${
            -1 === state.selectedLayer ? "white/25" : "transparent"
          }`,
        }}
      >
        <div
          className='layer-selector-dot'
          style={{
            backgroundColor: `${
              -1 === state.selectedLayer ? "white" : "transparent"
            }`,
          }}
        ></div>
        <div className='layer-selector-text'>Full View</div>
      </button>
      {state.selectedMap.layers.map((layer, i) => {
        return (
          <button
            key={i}
            className='layer-selector flex flex-row justify-start items-center
                 bg-black/50 border-r border-white/25 rounded-sm p-1  px-2 py-1 rounded-sm
                  flex flex-col justify-center items-center truncate
                    hover:bg-black/70 hover:text-white/80  text-white/75'
            onClick={() => handleLayerChange(i)}
            style={{
              backgroundColor: `${
                i === state.selectedLayer ? "white/25" : "transparent"
              }`,
            }}
          >
            <div
              className='layer-selector-dot'
              style={{
                backgroundColor: `${
                  i === state.selectedLayer ? "white" : "transparent"
                }`,
              }}
            ></div>
            <div className='layer-selector-text'>{layer.tag}</div>
          </button>
        );
      })}
      <button
        className='layer-selector flex flex-row justify-start items-center
                 bg-black/50   rounded-sm p-1  px-2 py-1 rounded-sm truncate
                  flex flex-col justify-center items-center w-8 border-r border-white/25
                    hover:bg-black/70 hover:text-white/80  text-white/75 h-full'
        onClick={handleAddLayer}
      >
        <div className='layer-selector-text'>+</div>
      </button>
    </div>
  );
};

export default LayerSelector;
