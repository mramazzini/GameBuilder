import MapNav from "../components/MapEditor/MapNav/MapNav";
import MapContainer from "../components/MapEditor/MapContainer/MapContainer";
import { MapProvider } from "../components/MapEditor/MapState/MapContext";
import { useProjectContext } from "../utils/GlobalState/GlobalState";
import Home from "./Home";
const MapEditor = () => {
  const { state } = useProjectContext();
  return state.projectDirectory ? (
    <div className='flex flex-row justify-between grow scroll-active '>
      <MapProvider>
        <MapNav />

        <MapContainer />
      </MapProvider>
    </div>
  ) : (
    <Home />
  );
};

export default MapEditor;
