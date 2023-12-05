import { useSelector } from "react-redux";
import { RootState } from "../../../utils/redux/store";
const ipcRenderer = window.ipcRenderer;
interface TileSaveProps {
  setSavingTile: React.Dispatch<React.SetStateAction<boolean>>;
}

const SaveTile = ({ setSavingTile }: TileSaveProps) => {
  const state = useSelector((state: RootState) => state.tileset);
  const projectState = useSelector((state: RootState) => state.global);
  const saveTile = () => {
    const payload = {
      projectDirectory: projectState.projectDirectory,
      tileset: projectState.tilesets.find(
        (tileset) => tileset.tag === state.selectedTileset.tag
      ),
    };
    ipcRenderer.send("save-tileset", payload);
  };
  return (
    <div className='w-screen h-screen bg-black/50 absolute z-10 top-0 left-0 flex justify-center items-center'>
      <div
        className='w-96  shadow-xl border-3 border-black  flex items-center flex-col bg-slate-950 absolute top-1/2
             left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md shadow-lg text-white font-mono'
      >
        <h1>Save Map?</h1>
        <div className='map-info flex flex-col justify-between items-start'></div>
        <div className='flex flex-row justify-between items-center'>
          <button
            className='bg-black/70 text-white px-5 py-1 rounded-md hover:bg-black/80 m-2 '
            onClick={() => {
              saveTile();
              setSavingTile(false);
            }}
          >
            Yes
          </button>
          <button
            className='bg-black/70 text-white px-5 py-1 rounded-md hover:bg-black/80 m-2'
            onClick={() => setSavingTile(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveTile;
