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
    return `rgba(${0}, ${0}, ${0}, ${0})`;
  };

  return pixel[3] !== 0 ? (
    <div
      key={`tile-${row}-${col}`}
      className='tile'
      style={{
        backgroundColor: calculateColor(),
        width: `2px`,
        height: `2px`,
      }}
      onMouseEnter={() => {
        isHovered.current = true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
    />
  ) : (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(2, 1fr)`,
        gridTemplateRows: `repeat(2, 1fr)`,
        gap: "0px",
        width: "2px",
        height: "2px",
        backgroundColor: "rgba(255, 255, 255, 1)",
      }}
    >
      <div
        className='tile-reader'
        style={{
          width: "1px",
          height: "1px",
          backgroundColor: "rgba(0,0, 0, 0.2)",
        }}
      />
      <div
        className='tile-reader'
        style={{
          width: "1px",
          height: "1px",
          backgroundColor: "rgba(0,0, 0, 0.1)",
        }}
      />
      <div
        className='tile-reader'
        style={{
          width: "1px",
          height: "1px",
          backgroundColor: "rgba(0,0, 0, 0.1)",
        }}
      />
      <div
        className='tile-reader'
        style={{
          width: "1px",
          height: "1px",
          backgroundColor: "rgba(0,0, 0, 0.2)",
        }}
      />
    </div>
  );
};

export default RenderPixel;
