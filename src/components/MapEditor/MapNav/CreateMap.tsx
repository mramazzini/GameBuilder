import { useMapContext } from "../../../utils/MapState/MapContext";
import { useProjectContext } from "../../../utils/GlobalState/GlobalState";
import {
  SET_SELECTED_LAYER,
  SET_SELECTED_MAP,
  SET_SELECTED_TILESET,
} from "../../../utils/MapState/actions";

import { useState, useEffect } from "react";
const ipcRenderer = window.ipcRenderer;

const CreateMap = () => {
  const { dispatch } = useMapContext();
  const { state: projectState } = useProjectContext();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState({ hasError: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState({
    tag: "",
    sizeX: 10,
    sizeY: 10,
    tileset: "NONE",
  });
  //key listener for escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (loading) return;
        setIsOpen(false);
        setError({ hasError: false, message: "" });
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    const handleMapCreated = async () => {
      ipcRenderer.send("refresh-project", projectState.projectDirectory);
      setLoading(false);
    };
    ipcRenderer.on("map-created", handleMapCreated);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      ipcRenderer.removeListener("map-created", handleMapCreated);
    };
  }, []);

  useEffect(() => {
    //if map created succesfully, set selected map and tileset to new map
    dispatch({
      type: SET_SELECTED_MAP,
      payload: projectState.maps[projectState.maps.length - 1],
    });
    const newTileset =
      projectState.tilesets.find(
        (tileset) =>
          tileset.tag ===
          projectState.maps[projectState.maps.length - 1]?.tileset
      ) || projectState.tilesets[0];
    dispatch({
      type: SET_SELECTED_TILESET,
      payload: newTileset,
    });
  }, [projectState.maps]);

  const validateInput = () => {
    const inputValue = (formdata.tag = formdata.tag.replace(/\s/g, "")); // Remove whitespace

    // Define a regular expression to allow only alphanumeric characters
    var regex = /^[a-zA-Z0-9_-]+$/;

    // Check if the input matches the regular expression
    if (!regex.test(inputValue)) {
      setError({
        hasError: true,
        message:
          "Only alphanumeric, hypen (-), and underscore (_) characters allowed",
      });
      return false;
    } else if (formdata.tileset === "NONE") {
      setError({ hasError: true, message: "Please select a tileset" });

      return false;
    }
    return true;
  };
  const createMap = () => {
    console.log(formdata);

    ipcRenderer.send("create-map", {
      map: {
        tag: formdata.tag,
        sizeX: formdata.sizeX,
        sizeY: formdata.sizeY,
        tileset: formdata.tileset,
      },
      projectDirectory: projectState.projectDirectory,
    });

    dispatch({
      type: SET_SELECTED_LAYER,
      payload: -1,
    });
  };
  return (
    <div>
      <button
        className='create-map hover:bg-black/70 hover:text-white/80 px-5 py-1 rounded-sm flex justify-center items-center font-bold bg-white/25 text-white border border-white/25 rounded-sm p-1 m-2  px-2 py-1 rounded-sm flex flex-col justify-center items-center '
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Create Map
      </button>
      {isOpen && (
        <div className='w-screen h-screen bg-black/50 absolute z-10 top-0 left-0 flex justify-center items-center'>
          {error.hasError ? (
            <div
              className='w-96  shadow-xl border-3 border-black  flex items-center flex-col bg-slate-950 absolute top-1/2
         left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md shadow-lg text-white font-mono'
            >
              {error.message}
              <button
                className='close-button hover:bg-black/70 hover:text-white/80 px-5 py-1 rounded-sm flex justify-center items-center font-bold'
                onClick={() => {
                  setLoading(false);
                  setError({ hasError: false, message: "" });
                }}
              >
                Go back
              </button>
            </div>
          ) : loading ? (
            <div
              className='w-96  shadow-xl border-3 border-black  flex items-center flex-col bg-slate-950 absolute top-1/2
         left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md shadow-lg text-white font-mono'
            >
              Attempting to create Map...
            </div>
          ) : (
            <div
              className='w-96  shadow-xl border-3 border-black  flex items-center flex-col bg-slate-950 absolute top-1/2
           left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md shadow-lg text-white font-mono'
            >
              <div className='w-full h-full bg-black/50 text-white/75 border border-white/25 rounded-sm p-1 m-2  px-2 py-1 rounded-sm flex flex-col justify-center items-center '>
                <div className='title text-xl'>Create Map</div>
                <div className='close'>
                  <button
                    className='close-button hover:bg-black/70 hover:text-white/80 px-5 py-1 rounded-sm flex justify-center items-center font-bold'
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Go back
                  </button>
                </div>
              </div>
              <div className='create-map-body'>
                <div className='create-map-form'>
                  <div className='create-map-form-item'>
                    <div className='create-map-form-item-label'>Map Name:</div>
                    <input
                      type='text'
                      value={formdata.tag}
                      className='bg-black/50 text-white/75 border border-white/25 rounded-sm p-1 m-2  px-2 py-1 rounded-sm flex flex-col justify-center items-center'
                      onChange={(e) => {
                        setFormdata({
                          ...formdata,
                          tag: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='create-map-form-item'>
                    <div className='create-map-form-item-label'>Size X:</div>
                    <input
                      type='number'
                      className='bg-black/50 text-white/75 border border-white/25 rounded-sm p-1 m-2  px-2 py-1 rounded-sm flex flex-col justify-center items-center'
                      value={formdata.sizeX}
                      onChange={(e) => {
                        setFormdata({
                          ...formdata,
                          sizeX: parseInt(e.target.value),
                        });
                      }}
                    />
                  </div>
                  <div className='create-map-form-item'>
                    <div className='create-map-form-item-label'>Size Y:</div>
                    <input
                      type='number'
                      value={formdata.sizeY}
                      className='bg-black/50 text-white/75 border border-white/25 rounded-sm p-1 m-2  px-2 py-1 rounded-sm flex flex-col justify-center items-center'
                      onChange={(e) => {
                        setFormdata({
                          ...formdata,
                          sizeY: parseInt(e.target.value),
                        });
                      }}
                    />
                  </div>
                  <div className='create-map-form-item'>
                    <div className='create-map-form-item-label'>Tileset:</div>
                    <select
                      value={formdata.tileset}
                      className='bg-black/50 text-white/75 border border-white/25 rounded-sm p-1 m-2  px-2 py-1 rounded-sm flex flex-col justify-center items-center'
                      onChange={(e) => {
                        setFormdata({
                          ...formdata,
                          tileset: e.target.value,
                        });
                        console.log(formdata, e.target.value);
                      }}
                    >
                      <option value='NONE'>none</option>
                      {projectState.tilesets.map((tileset, index) => {
                        return (
                          <option key={index} value={tileset.tag}>
                            {tileset.tag}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className='create-map-footer'>
                <button
                  className='bg-black/70 text-white px-5 py-1 rounded-md hover:bg-black/80 m-2 '
                  onClick={() => {
                    if (!validateInput()) return;
                    createMap();

                    setIsOpen(false);
                    setLoading(true);
                  }}
                >
                  Create
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateMap;
