import GameLog from "../components/AppRunner/GameLog";
import { useProjectContext } from "../utils/GlobalState/GlobalState";
import Home from "./Home";
const AppRunner = () => {
  const { state } = useProjectContext();
  return state.projectDirectory ? (
    <div className='flex flex-col justify-start h-full'>
      <GameLog />
    </div>
  ) : (
    <Home />
  );
};

export default AppRunner;
