import { useTilesetContext } from "../TilesetState/TilesetContext";
import { useProjectContext } from "../../../utils/GlobalState/GlobalState";
const ColorSelector = () => {
  const { state, dispatch } = useTilesetContext();
  const { state: projectState, dispatch: projectDispatch } =
    useProjectContext();
  return (
    <div className='flex flex-col justify-between items-center h-full p-3 bg-black/75 w-full border border-white/25 overflow-hidden '>
      <h1 className='text-2xl'>Tile Selector</h1>
      <div
        className='tile-selector  grid-container bg-white'
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
                  className='tile-reader'
                  style={{ width: "16px", height: "16px" }}
                  onClick={() =>
                    dispatch({
                      type: "SET_SELECTED_COLOR",
                      payload: projectState.colors[index],
                    })
                  }
                ></div>
              </div>
            );
          })}
        {/* fill in rest of grid */}
        {projectState.colors.length % 10 != 0 ||
          (projectState.colors.length == 0 &&
            [...Array(10 - (projectState.colors.length % 10))].map(
              (_, index) => {
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
              }
            ))}
      </div>
    </div>
  );
};

export default ColorSelector;
