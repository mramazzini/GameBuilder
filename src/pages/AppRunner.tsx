import GameLog from "../components/AppRunner/GameLog";
import { useProjectContext } from "../utils/GlobalState/GlobalState";
import Home from "./Home";
const AppRunner = () => {
  const { state } = useProjectContext();
  return state.projectDirectory ? (
    <div className='flex flex-col justify-end h-full'>
      <GameLog />
      <div className='gap h-1/6'></div>
    </div>
  ) : (
    <Home />
  );
};

export default AppRunner;
