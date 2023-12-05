import TABLIST from "../utils/TabList";
import { useSelector, useDispatch } from "react-redux";
import { toggleFileExplorer } from "../utils/redux/reducers/GlobalReducers";
import { RootState } from "../utils/redux/store";
const Navbar = (props: { setCurrentPage: Function; currentPage: string }) => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.global);
  const getButtonClasses = (option: string) => {
    return `btn btn-outline-light font-bold font-mono ml-1 text-md px-2 py-1  hover:bg-slate-400 rounded-md ${
      option === props.currentPage ? "text-black bg-slate-200" : "text-white"
    }`;
  };
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-slate-900 flex  justify-between items-center border-b border-white/25'>
      <div className='flex'>
        {TABLIST.map((option, i) => (
          <button
            key={i}
            className={getButtonClasses(option.tab)}
            onClick={() => {
              props.setCurrentPage(option.id);
            }}
          >
            {option.tab}
          </button>
        ))}
      </div>
      {/* hide the navbar button*/}
      <button
        className='btn btn-outline-light font-bold font-mono  text-white text-lg px-2 py-1 m-1 hover:bg-slate-400 rounded-md'
        onClick={() => dispatch(toggleFileExplorer())}
      >
        {state.fileExplorerOpened ? "Hide" : "Show Explorer"}
      </button>
    </nav>
  );
};

export default Navbar;
