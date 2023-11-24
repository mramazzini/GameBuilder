import { useEffect, useState } from "react";
import Colorwheel from "./Colorwheel";

const ColorWheelContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", keyListener);
    return () => {
      document.removeEventListener("keydown", keyListener);
    };
  }, []);

  return (
    <div className='color-selector-toggle flex flex-col justify-center items-center'>
      <button
        className='hover:bg-black/70 hover:text-white/80 px-5 py-1 rounded-sm flex justify-center items-center 
        font-bold bg-white/25 text-white border border-white/25 rounded-sm p-1 m-2  px-2 py-1 rounded-sm
         flex flex-col justify-center items-center'
        onClick={() => setIsOpen(true)}
      >
        Open Color Select
      </button>
      {isOpen && (
        <div
          className='close absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center'
          style={{
            zIndex: 1000,
          }}
        >
          <div
            className='w-96  shadow-xl border-3 border-black justify-center flex items-center flex-col bg-slate-950 absolute top-1/2
             left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md shadow-lg text-white font-mono'
          >
            <div className='w-full h-full bg-black/50 text-white/75 border border-white/25 rounded-sm p-1 m-2  px-2 py-1 rounded-sm flex flex-col justify-center items-center '>
              <div className='title text-xl'>Color Selector</div>
              <div className='close flex-col w-full flex justify-center items-center'>
                <button
                  className='close-button hover:bg-black/70 hover:text-white/80 px-5 py-1 rounded-sm flex justify-center items-center font-bold'
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Go back
                </button>
                <Colorwheel />
              </div>
            </div>
            <div className='create-map-body'></div>
            <div className='create-map-footer'></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorWheelContainer;
