import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../utils/redux/store";
import { setSelectedLayer } from "../../../utils/redux/reducers/MapReducers";

import { useState } from "react";
const LayerSelector = () => {
  const [hoveredLayer, setHoveredLayer] = useState<number>(-1);
  const state = useSelector((state: RootState) => state.map);
  const dispatch = useDispatch();
  const handleLayerChange = async (num: number) => {
    await dispatch(setSelectedLayer(num));
  };

  return state.selectedMap && state.selectedTileset ? (
    <div
      className='layer-selector-container 
       flex flex-row justify-start items-center  bg-black/50 border-b 
       border-white/25 rounded-sm h-10

    '
    >
      <button
        className='layer-selector flex flex-row justify-around items-center
        bg-black/50   rounded-sm  px-2 py-1 rounded-sm border-r border-white/25
       justify-center items-center  bg-black/50 w-1/4
           hover:bg-black/70 hover:text-white/80  text-white/75 h-8 truncate'
        onClick={() => handleLayerChange(-1)}
      >
        <div
          className='layer-selector-dot mr-1'
          style={{
            backgroundColor: `${
              -1 === state.selectedLayer ? "white" : "transparent"
            }`,
            border: `${
              -1 === state.selectedLayer
                ? "1px solid white"
                : "1px solid transparent"
            }`,
            borderRadius: "50%",
          }}
        ></div>
        <div className='layer-selector-text truncate'>Colliders</div>
        <div
          className='layer-selector-dot ml-1'
          style={{
            backgroundColor: `${
              -1 === state.selectedLayer ? "white" : "transparent"
            }`,
            border: `${
              -1 === state.selectedLayer
                ? "1px solid white"
                : "1px solid transparent"
            }`,
            borderRadius: "50%",
          }}
        ></div>
      </button>

      {state.selectedMap.layers.map((layer, i) => {
        return (
          <button
            key={i}
            className='layer-selector flex flex-row justify-around items-center
            bg-black/50   rounded-sm  px-2 py-1 rounded-sm border-r border-white/25
           justify-center items-center  bg-black/50 h-8 w-1/4
               hover:bg-black/70 hover:text-white/80  text-white/75 h-full truncate'
            onClick={() => handleLayerChange(i)}
            onMouseEnter={() => setHoveredLayer(i)}
            onMouseLeave={() => setHoveredLayer(-1)}
          >
            <div
              className='layer-selector-dot mr-1'
              style={{
                backgroundColor: `${
                  i === state.selectedLayer ? "white" : "transparent"
                }`,
                border: `${
                  i === state.selectedLayer
                    ? "1px solid white"
                    : "1px solid transparent"
                }`,
                borderRadius: "50%",
              }}
            ></div>
            <div className='layer-selector-text truncate'>{layer.tag}</div>
            <div
              className='layer-selector-dot ml-1'
              style={{
                backgroundColor: `${
                  i === state.selectedLayer ? "white" : "transparent"
                }`,
                border: `${
                  i === state.selectedLayer
                    ? "1px solid white"
                    : "1px solid transparent"
                }`,
                borderRadius: "50%",
              }}
            ></div>
          </button>
        );
      })}
    </div>
  ) : (
    ""
  );
};

export default LayerSelector;
