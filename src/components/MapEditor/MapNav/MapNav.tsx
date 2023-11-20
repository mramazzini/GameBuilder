import React, { useState, useRef, useEffect } from "react";
import SideNav from "../../SideNav";
import TileSelector from "./TileSelector";
import MapToggle from "./MapToggle";
import MapSave from "./MapSave";
import MapInfo from "./MapInfo";
import TilePreview from "./TilePreview";
import ColliderInfo from "./ColliderInfo";
import CreateMap from "./CreateMap";
import DeleteMap from "./DeleteMap";

const MapNav = () => {
  const [savingMap, setSavingMap] = useState(false);

  return (
    <SideNav>
      <MapToggle />
      <TileSelector />

      <TilePreview />
      <ColliderInfo />
      <MapInfo />
      <CreateMap />
      <button
        onClick={() => setSavingMap(true)}
        className='hover:bg-black/70 hover:text-white/80 px-5 py-1 rounded-sm flex justify-center items-center font-bold bg-white/25 text-white border border-white/25 rounded-sm p-1 m-2  px-2 py-1 rounded-sm flex flex-col justify-center items-center'
      >
        Save Map to Project
      </button>
      <DeleteMap />
      {savingMap && <MapSave setSavingMap={setSavingMap} />}
    </SideNav>
  );
};

export default MapNav;
