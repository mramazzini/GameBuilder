import GameLog from "../components/AppRunner/GameLog";
import { useSelector } from "react-redux";
import { RootState } from "../utils/redux/store";
import Home from "./Home";
const AppRunner = () => {
  const state = useSelector((state: RootState) => state.global);
  return state.projectDirectory ? (
    <div className='flex flex-col justify-start h-full'>
      <GameLog />
    </div>
  ) : (
    <Home />
  );
};

export default AppRunner;
