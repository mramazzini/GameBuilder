import { useRef } from "react";
interface RenderTileProps {
  pixel: number[];
  row: number;
  col: number;
}

const RenderPixel = ({ pixel, row, col }: RenderTileProps) => {
  const isHovered = useRef(false);
  const calculateBorder = () => {
    if (isHovered.current) {
      return `1px solid yellow`;
    }
    return `none`;
  };
  const calculateColor = () => {
    if (pixel[3] !== 0) {
      return `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3]})`;
    }
    //return grey or white depending on row and col
    if (row % 2 === 0 && col % 2 === 0) {
      return `rgba(${100}, ${100}, ${100}, ${255})`;
    }
    if (row % 2 === 0 && col % 2 !== 0) {
      return `rgba(${255}, ${255}, ${255}, ${255})`;
    }
    if (row % 2 !== 0 && col % 2 === 0) {
      return `rgba(${255}, ${255}, ${255}, ${255})`;
    }
    if (row % 2 !== 0 && col % 2 !== 0) {
      return `rgba(${100}, ${100}, ${100}, ${255})`;
    }

    return `rgba(${0}, ${0}, ${0}, ${255})`;
  };

  return (
    <div
      key={`tile-${row}-${col}`}
      className='tile'
      style={{
        backgroundColor: calculateColor(),
        width: `1px`,
        height: `1px`,
      }}
      onMouseEnter={() => {
        isHovered.current = true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
    />
  );
};

export default RenderPixel;
