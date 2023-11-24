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

  return (
    <div
      key={`tile-${row}-${col}`}
      className='tile'
      style={{
        backgroundColor: `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3]})`,
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
