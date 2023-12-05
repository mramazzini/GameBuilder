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
      className='bg-black/50 text-white  min-w-max
      border-r border-white/25  flex flex-row justify-between items-start scroll-active'
      style={{
        paddingBottom: "1rem",
        width: `${width}px`,
        height: `calc(100vh - 5rem)`,
        maxWidth: `33vw`,
      }}
    >
      <div className='flex flex-col justify-between items-center p-2 w-full'>
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
