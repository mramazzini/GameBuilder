import MapNav from "../components/MapEditor/MapNav/MapNav";
import MapContainer from "../components/MapEditor/MapContainer/MapContainer";
import { useSelector } from "react-redux";
import { RootState } from "../utils/redux/store";

import LayerSelector from "../components/MapEditor/LayerSelector/LayerSelector";
import Home from "./Home";
const MapEditor = () => {
  const state = useSelector((state: RootState) => state.global);
  return state.projectDirectory ? (
    <div className='flex flex-row justify-between grow scroll-active '>
      <MapNav />
      <div className=' grow flex flex-col'>
        <LayerSelector />
        <MapContainer />
      </div>
    </div>
  ) : (
    <Home />
  );
};

export default MapEditor;
