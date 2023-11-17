import MapNav from "../components/MapEditor/MapNav/MapNav";
import MapContainer from "../components/MapEditor/MapContainer/MapContainer";
import { MapProvider } from "../components/MapEditor/MapState/MapContext";

const MapEditor = () => {
  return (
    <div className='flex flex-row justify-between grow'>
      <MapProvider>
        <MapNav />
        <MapContainer />
      </MapProvider>
    </div>
  );
};

export default MapEditor;
