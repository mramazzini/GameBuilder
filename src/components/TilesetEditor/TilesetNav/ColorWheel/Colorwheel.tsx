import { useTilesetContext } from "../../TilesetState/TilesetContext";
import { useState, useEffect } from "react";
import { RGBA } from "../../../../utils/types";
import { Sketch } from "@uiw/react-color";
const Colorwheel = () => {
  const [selectedColor, setSelectedColor] = useState<RGBA>({
    r: 0,
    g: 0,
    b: 0,
    a: 0,
  });
  const { state, dispatch } = useTilesetContext();
  useEffect(() => {
    //initialize selected color
    setSelectedColor(state.selectedColor);
  }, []);
  const handleAddColor = () => {
    dispatch({ type: "ADD_COLOR", payload: selectedColor });
  };
  useEffect(() => {
    console.log(state.colors);
  }, [state.colors]);

  return (
    <div className='color-wheel flex flex-col justify-center items-center'>
      <Sketch
        style={{ marginLeft: 20 }}
        color={`rgba(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b}, ${selectedColor.a})`}
        onChange={(color) => {
          setSelectedColor(color.rgba);
        }}
      />
      <button
        onClick={handleAddColor}
        className='add-color  hover:bg-black/70 hover:text-white/80 px-5 py-1 rounded-sm flex justify-center items-center font-bold bg-white/25 text-white border border-white/25 rounded-sm p-1 m-2  px-2 py-1 rounded-sm flex flex-col justify-center items-center'
      >
        Add Color
      </button>
    </div>
  );
};

export default Colorwheel;