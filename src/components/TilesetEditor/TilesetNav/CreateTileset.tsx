import { useTilesetContext } from "../../../utils/TilesetState/TilesetContext";
import { useProjectContext } from "../../../utils/GlobalState/GlobalState";
import { useEffect, useRef, useState } from "react";
import { SET_SELECTED_TILESET } from "../../../utils/TilesetState/actions";
import { CREATE_TILESET } from "../../../utils/GlobalState/actions";
const CreateTileset = () => {
  const { state, dispatch } = useTilesetContext();
  const { state: projectState, dispatch: projectDispatch } =
    useProjectContext();

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState({ hasError: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState({
    tag: "",
    tileSize: 1,
  });

  const validateInput = () => {
    const inputValue = (formdata.tag = formdata.tag.replace(/\s/g, "")); // Remove whitespace

    // Define a regular expression to allow only alphanumeric characters
    var regex = /^[a-zA-Z0-9_-]+$/;

    // Check if the input matches the regular expression
    if (regex.test(inputValue)) {
      setError({ hasError: false, message: "" });
      return true;
    } else {
      setError({
        hasError: true,
        message:
          "Only alphanumeric, hypen (-), and underscore (_) characters allowed",
      });
      return false;
    }
  };

  const handleCreateTileset = () => {
    if (formdata.tag === "") {
      setError({ hasError: true, message: "Tileset name cannot be empty" });
      return;
    }
    if (projectState.tilesets.find((tileset) => tileset.tag === formdata.tag)) {
      setError({ hasError: true, message: "Tileset already exists" });
      return;
    }
    projectDispatch({
      type: CREATE_TILESET,
      payload: {
        tag: formdata.tag,
        tileSize: formdata.tileSize,
      },
    });

    dispatch({
      type: SET_SELECTED_TILESET,
      payload: projectState.tilesets[projectState.tilesets.length - 1],
    });
    setFormdata({
      tag: "",
      tileSize: 1,
    });
    setIsOpen(false);
  };

  return (
    <div>
      <button
        className='create-map hover:bg-black/70 hover:text-white/80 px-5 py-1 rounded-sm flex justify-center items-center font-bold bg-white/25 text-white border border-white/25 rounded-sm p-1 m-2  px-2 py-1 rounded-sm flex flex-col justify-center items-center '
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Create Tileset
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
                  setError({ hasError: false, message: "" });
                  setLoading(false);
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
              Attempting to create Tileset...
            </div>
          ) : (
            <div
              className='w-96  shadow-xl border-3 border-black  flex items-center flex-col bg-slate-950 absolute top-1/2
           left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md shadow-lg text-white font-mono'
            >
              <div className='w-full h-full bg-black/50 text-white/75 border border-white/25 rounded-sm p-1 m-2  px-2 py-1 rounded-sm flex flex-col justify-center items-center '>
                <div className='title text-xl'>Create Tileset</div>
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
                    <div className='create-map-form-item-label'>
                      Tileset Name:
                    </div>
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
                    <div className='create-map-form-item-label'>
                      Tile Size (px):
                    </div>
                    <input
                      type='number'
                      value={formdata.tileSize}
                      className='bg-black/50 text-white/75 border border-white/25 rounded-sm p-1 m-2  px-2 py-1 rounded-sm flex flex-col justify-center items-center'
                      onChange={(e) => {
                        setFormdata({
                          ...formdata,
                          tileSize:
                            parseInt(e.target.value) > 1
                              ? parseInt(e.target.value)
                              : 1,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className='create-map-footer'>
                <button
                  className='bg-black/70 text-white px-5 py-1 rounded-md hover:bg-black/80 m-2 '
                  onClick={() => {
                    if (!validateInput()) return;
                    handleCreateTileset();

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

export default CreateTileset;
