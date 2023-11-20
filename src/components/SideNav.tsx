import { useState, useEffect } from "react";

const SideNav = (props: any) => {
  const [width, setWidth] = useState(400);
  const [resizing, setResizing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      if (resizing) {
        let width = e.clientX;

        if (width < 100) {
          width = 20;
        }
        setWidth(width);
      }
    };
    const handleMouseUp = () => {
      setResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizing]);

  const handleMouseDown = () => {
    setResizing(true);
  };
  return (
    <div
      className='map-nav bg-black/50 text-white h-full overflow-ellipsis 
      border-r border-white/25 overflow-hidden flex flex-row justify-between items-start'
      style={{
        width: `${width}px`,
      }}
    >
      <div className='flex flex-col justify-between items-center p-2 overflow-hidden '>
        {props.children}
      </div>
      <div
        style={{
          cursor: "ew-resize",
          height: "100%",
          width: "10px",
          minWidth: "10px",
        }}
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
};

export default SideNav;
