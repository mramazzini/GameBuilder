import SideNav from "../../SideNav";
import { SET_SELECTED_TILESET } from "../TilesetState/actions";

import { useTilesetContext } from "../TilesetState/TilesetContext";
import { useProjectContext } from "../../../utils/GlobalState/GlobalState";
const TilesetNav = () => {
  const { state: projectState } = useProjectContext();
  const { state, dispatch } = useTilesetContext();
  return (
    <SideNav>
      <select
        className='bg-black/50 text-white/75 border border-white/25 rounded-sm p-1'
        onChange={(e) => {
          console.log(state);

          dispatch({
            type: SET_SELECTED_TILESET,
            //find the tileset in the project state that matches the value of the select
            payload: projectState.tilesets.find(
              (tileset) => tileset.tag === e.target.value
            ),
          });
        }}
      >
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
    </SideNav>
  );
};

export default TilesetNav;
