import MapNav from "../components/MapEditor/MapNav/MapNav";
import MapContainer from "../components/MapEditor/MapContainer/MapContainer";
import { MapProvider } from "../components/MapEditor/MapState/MapContext";
import { useProjectContext } from "../utils/GlobalState/GlobalState";
const MapEditor = () => {
  const { state } = useProjectContext();
  return (
    <div className='flex flex-row justify-between grow'>
      {state.projectDirectory ? (
        <MapProvider>
          <MapNav />
          <MapContainer />
        </MapProvider>
      ) : (
        <div className='flex flex-col justify-center items-center w-full h-full'>
          <h1 className=' text-white font-bold text-center md:text-3xl lg:text-4xl sm:text-2xl'>
            Select A Project to get started
          </h1>
        </div>
      )}
    </div>
  );
};

export default MapEditor;
