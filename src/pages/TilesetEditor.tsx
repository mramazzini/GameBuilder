import Home from "./Home";
import TilesetNav from "../components/TilesetEditor/TilesetNav/TilesetNav";
import TilesetContainer from "../components/TilesetEditor/TilesetContainer/TilesetContainer";
import { useSelector } from "react-redux";
import { RootState } from "../utils/redux/store";
const TilesetEditor = () => {
  const state = useSelector((state: RootState) => state.global);
  return state.projectDirectory ? (
    <div className='flex flex-row justify-between grow'>
      <TilesetNav />
      <TilesetContainer />
    </div>
  ) : (
    <Home />
  );
};

export default TilesetEditor;
