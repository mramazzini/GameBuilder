import { useTilesetContext } from "../TilesetState/TilesetContext";
import { useEffect, useRef } from "react";
const TileEditor = ({ tileNum }: { tileNum: number }) => {
  // const { state } = useTilesetContext();
  // const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // useEffect(() => {
  //   const base64Image = `data:image/png;base64,${state.selectedTileset.base64}`;
  //   if (base64Image && canvasRef.current) {
  //     const img = new Image();
  //     img.src = base64Image;

  //     img.onload = () => {
  //       const canvas = canvasRef.current;

  //       if (canvas) {
  //         const ctx = canvas.getContext("2d");

  //         if (ctx) {
  //           // Resize the canvas if needed
  //           canvas.width = img.width;
  //           canvas.height = img.height;

  //           ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  //           const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //           const pixelArray = imageData.data;

  //           // Process the pixelArray if needed
  //           console.log('Processed Pixels:', pixelArray);
  //         }
  //     };
  //   }
  //   } else {
  //     console.log("No base64Image");
  //   }
  // }
  // }, [state.selectedTileset.base64]);

  return (
    <div className='tile-editor w-full h-full'>
      {/* <canvas ref={canvasRef} style={{ border: "1px solid #ddd" }} /> */}
    </div>
  );
};

export default TileEditor;
