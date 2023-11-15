import React, { useEffect } from "react";
import { Tileset } from "../../utils/types";
interface TilePreviewProps {
  tile: number;
  tileset: Tileset;
}

const TilePreview = ({ tile, tileset }: TilePreviewProps) => {
  // Displays an image preview of the selected tile
  useEffect(() => {
    console.log(
      tileset.tileWidth * (tile % 10),
      tileset.tileHeight * Math.floor(tile / 10)
    );
  }, [tile]);
  return (
    <div
      className='flex flex-col justify-center items-center h-full'
      style={{
        width: `${128}px`,
        height: `${128}px`,
      }}
    >
      <div
        className='tile-preview '
        style={{
          backgroundImage: `url("data:image/png;base64,${tileset.base64}")`,
          backgroundPosition: `-${tileset.tileWidth * (tile % 10)}px ${
            tileset.tileHeight * Math.floor(tile / 10)
          }px`,
          width: `${tileset.tileWidth}px`,
          height: `${tileset.tileHeight}px`,
          border: "1px solid black",
          transform: "scale(8)",
        }}
      />
    </div>
  );
};

export default TilePreview;
