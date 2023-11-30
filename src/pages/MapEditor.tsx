import MapNav from "../components/MapEditor/MapNav/MapNav";
import MapContainer from "../components/MapEditor/MapContainer/MapContainer";
import { MapProvider } from "../utils/MapState/MapContext";
import { useProjectContext } from "../utils/GlobalState/GlobalState";
import LayerSelector from "../components/MapEditor/LayerSelector/LayerSelector";
import Home from "./Home";
const MapEditor = () => {
  const { state } = useProjectContext();
  return state.projectDirectory ? (
    <div className='flex flex-row justify-between grow scroll-active '>
      <MapProvider>
        <MapNav />
        <div className=' grow flex flex-col'>
          <LayerSelector />
          <MapContainer />
        </div>
      </MapProvider>
    </div>
  ) : (
    <Home />
  );
};

export default MapEditor;
