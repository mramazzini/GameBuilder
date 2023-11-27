import { useTilesetContext } from "../../../utils/TilesetState/TilesetContext";
import { useProjectContext } from "../../../utils/GlobalState/GlobalState";
import { RGBA } from "../../../utils/types";
const ColorSelector = () => {
  const { state, dispatch } = useTilesetContext();
  const { state: projectState, dispatch: projectDispatch } =
    useProjectContext();
  const equalColors = (color1: RGBA, color2: RGBA) => {
    if (!color1 || !color2) return false;
    return (
      color1.r === color2.r &&
      color1.g === color2.g &&
      color1.b === color2.b &&
      color1.a === color2.a
    );
  };
  return (
    <div className='flex flex-col justify-between items-center h-full p-3 bg-black/75 w-full border border-white/25 overflow-hidden '>
      <h1 className='text-2xl'>Color Selector</h1>
      <div
        className='color-selector  grid-container bg-white border border-white/25  '
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${10}, 1fr)`,
          gridTemplateRows: `repeat(${Math.ceil(
            projectState.colors.length / 10
          )}, 1fr)`,
          gap: "0px",
        }}
      >
        {projectState.colors.length > 0 &&
          projectState.colors.map((_, index) => {
            return (
              <div
                key={index}
                className='tile'
                style={{
                  backgroundColor: `rgba(${projectState.colors[index].r}, ${projectState.colors[index].g}, ${projectState.colors[index].b}, ${projectState.colors[index].a})`,
                  width: `${16}px`,
                  height: `${16}px`,
                }}
              >
                <div
                  className='tile-reader flex flex-row justify-center items-center'
                  style={{
                    width: "16px",
                    height: "16px",
                    cursor: "pointer",
                    border: `2px solid ${
                      equalColors(
                        projectState.colors[state.selectedColor],
                        projectState.colors[index]
                      )
                        ? " black"
                        : "transparent"
                    }`,
                  }}
                  onClick={() =>
                    dispatch({
                      type: "SET_SELECTED_COLOR",
                      payload: index,
                    })
                  }
                >
                  <div
                    className='selected-color-circle '
                    style={{
                      width: `${6}px`,
                      height: `${6}px`,
                      borderRadius: `${3}px`,
                      border: `3px  solid`,
                      position: "absolute",
                      zIndex: 1,
                      display: `${
                        equalColors(
                          projectState.colors[state.selectedColor],
                          projectState.colors[index]
                        )
                          ? "block"
                          : "none"
                      }`,
                      mixBlendMode: "difference",
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        {/* fill in rest of grid */}
        {[...Array(10 - (projectState.colors.length % 10))].map((_, index) => {
          return (
            <div
              key={index}
              className='tile'
              style={{
                width: `${16}px`,
                height: `${16}px`,
                display: "grid",
                gridTemplateColumns: `repeat(2, 1fr)`,
                gridTemplateRows: `repeat(2, 1fr)`,
                gap: "0px",
              }}
            >
              <div
                className='tile-reader'
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "grey",
                }}
              />
              <div
                className='tile-reader'
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "white",
                }}
              />
              <div
                className='tile-reader'
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "white",
                }}
              />
              <div
                className='tile-reader'
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "grey",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
