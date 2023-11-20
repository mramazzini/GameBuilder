import { useProjectContext } from "../utils/GlobalState/GlobalState";
import Home from "./Home";
import TilesetNav from "../components/TilesetEditor/TilesetNav/TilesetNav";
import TilesetContainer from "../components/TilesetEditor/TilesetContainer/TilesetContainer";
import { TilesetProvider } from "../components/TilesetEditor/TilesetState/TilesetContext";
const TilesetEditor = () => {
  const { state } = useProjectContext();
  return state.projectDirectory ? (
    <div className='flex flex-row justify-between grow'>
      <TilesetProvider>
        <TilesetNav />
        <TilesetContainer />
      </TilesetProvider>
    </div>
  ) : (
    <Home />
  );
};

export default TilesetEditor;
