import { useProjectContext } from "../../utils/GlobalState/GlobalState";
const ipcRenderer = window.ipcRenderer;
interface MapSaveProps {
  setSavingMap: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMap: any;
  selectedTileset: any;
}

const MapSave = ({
  setSavingMap,
  selectedMap,
  selectedTileset,
}: MapSaveProps) => {
  const { state } = useProjectContext();
  const saveMap = () => {
    const payload = {
      map: selectedMap,
      projectDirectory: state.projectDirectory,
      tileSet: selectedTileset,
    };
    ipcRenderer.send("save-map", payload);
  };
  return (
    <div className='w-screen h-screen bg-black/50 absolute z-10 top-0 left-0 flex justify-center items-center'>
      <div
        className='w-96  shadow-xl border-3 border-black  flex items-center flex-col bg-slate-950 absolute top-1/2
           left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md shadow-lg text-white font-mono'
      >
        <h1>Save Map?</h1>
        <div className='map-info flex flex-col justify-between items-start'>
          <div className='text-sm'>Map Name: {selectedMap.tag}</div>
          <div className='text-sm'>
            Map Size: {selectedMap.sizeX} x {selectedMap.sizeY}
          </div>
          <div className='text-sm'>Tileset: {selectedTileset.tag}</div>
        </div>
        <div className='flex flex-row justify-between items-center'>
          <button
            className='bg-black/70 text-white px-5 py-1 rounded-md hover:bg-black/80 m-2 '
            onClick={() => {
              saveMap();
              setSavingMap(false);
            }}
          >
            Yes
          </button>
          <button
            className='bg-black/70 text-white px-5 py-1 rounded-md hover:bg-black/80 m-2'
            onClick={() => setSavingMap(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapSave;
