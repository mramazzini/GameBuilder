import GameLog from "../components/GameLog";
import { useProjectContext } from "../utils/GlobalState/GlobalState";
import Home from "./Home";
const AppRunner = () => {
  const { state } = useProjectContext();
  return state.projectDirectory ? (
    <div className='flex flex-col justify-end h-full'>
      <GameLog />
      <div className='gap  h-full'>asd</div>
    </div>
  ) : (
    <Home />
  );
};

export default AppRunner;
