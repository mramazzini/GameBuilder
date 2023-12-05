import SideNav from "../../SideNav";
import AddTile from "./AddTile";
import CreateTileset from "./CreateTileset";

import { setSelectedTileset } from "../../../utils/redux/reducers/TilesetReducers";
import { RootState } from "../../../utils/redux/store";
import { useSelector, useDispatch } from "react-redux";
import ColorWheelContainer from "./ColorWheel/ColorWheelContainer";

import ColorSelector from "./ColorSelector";
import SaveTile from "./SaveTile";
import { useState } from "react";
const TilesetNav = () => {
  const [savingTile, setSavingTile] = useState(false);
  const dispatch = useDispatch();
  const projectState = useSelector((state: RootState) => state.global);
  const state = useSelector((state: RootState) => state.tileset);
  return (
    <SideNav>
      <div className='nav-wrapper flex flex-col justify-center items-center text-white  m-2'>
        <div className='flex flex-row justify-center items-center'>
          <div className='text-sm px-2'>Tileset:</div>
          <select
            value={state.selectedTileset.tag}
            className='bg-black/50 text-white/75 border border-white/25 rounded-sm p-1'
            onChange={async (e) => {
              console.log(state);
              if (e.target.value !== "NONE") {
                await dispatch(
                  setSelectedTileset(
                    projectState.tilesets.find(
                      (tileset) => tileset.tag === e.target.value
                    ) || projectState.tilesets[0]
                  )
                );
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
        <AddTile />
        <CreateTileset />
        <button
          onClick={() => setSavingTile(true)}
          className='hover:bg-black/70 hover:text-white/80 px-5 py-1 rounded-sm flex justify-center
         items-center font-bold bg-white/25 text-white border border-white/25 rounded-sm p-1 m-2 
          px-2 py-1 rounded-sm flex flex-col justify-center items-center'
        >
          Save Tileset to Project
        </button>

        {savingTile && <SaveTile setSavingTile={setSavingTile} />}
      </div>
    </SideNav>
  );
};

export default TilesetNav;
