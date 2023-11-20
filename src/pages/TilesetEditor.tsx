import { useProjectContext } from "../utils/GlobalState/GlobalState";
import Home from "./Home";
const TilesetEditor = () => {
  const { state } = useProjectContext();
  return state.projectDirectory ? (
    <div className='flex flex-row justify-between grow'>
      <div>Tileset Editor</div>
    </div>
  ) : (
    <Home />
  );
};

export default TilesetEditor;
