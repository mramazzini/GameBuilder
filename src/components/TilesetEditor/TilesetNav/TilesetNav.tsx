import SideNav from "../../SideNav";
import { SET_SELECTED_TILESET } from "../TilesetState/actions";
import ColorWheelContainer from "./ColorWheel/ColorWheelContainer";
import { useTilesetContext } from "../TilesetState/TilesetContext";
import { useProjectContext } from "../../../utils/GlobalState/GlobalState";
import ColorSelector from "./ColorSelector";
const TilesetNav = () => {
  const { state: projectState } = useProjectContext();
  const { state, dispatch } = useTilesetContext();
  return (
    <SideNav>
      <div className='nav-wrapper flex flex-col justify-center items-center text-white  m-2'>
        <div className='flex flex-row justify-center items-center'>
          <div className='text-sm px-2'>Tileset:</div>
          <select
            className='bg-black/50 text-white/75 border border-white/25 rounded-sm p-1'
            onChange={(e) => {
              console.log(state);
              if (e.target.value !== "NONE") {
                dispatch({
                  type: SET_SELECTED_TILESET,
                  //find the tileset in the project state that matches the value of the select
                  payload: projectState.tilesets.find(
                    (tileset) => tileset.tag === e.target.value
                  ),
                });
              }
            }}
          >
            <option value='NONE'>none</option>
            {projectState.tilesets.map((tileset, i) => (
              <option
                key={i}
                value={tileset.tag}
                defaultValue={state.selectedTileset.tag}
              >
                {tileset.tag}
              </option>
            ))}
          </select>
        </div>
        <ColorWheelContainer />
        <ColorSelector />
      </div>
    </SideNav>
  );
};

export default TilesetNav;
