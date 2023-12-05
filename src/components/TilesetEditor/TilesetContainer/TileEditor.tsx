import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../utils/redux/store";
import { setNewBase64Image } from "../../../utils/redux/reducers/GlobalReducers";
import { setSelectedColor } from "../../../utils/redux/reducers/TilesetReducers";
import RenderPixel from "./RenderPixel";
const TileEditor = ({ tileNum }: { tileNum: number }) => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.tileset);
  const projectState = useSelector((state: RootState) => state.global);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [zoom, setZoom] = useState(30);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [pixelData, setPixelData] = useState<number[][][]>([[[]]]);
  const [currentPixelHover, setCurrentPixelHover] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<{
    dragging: boolean;
    mouseEvent: number;
  }>({ dragging: false, mouseEvent: 0 });

  useEffect(() => {
    dispatch(setSelectedColor(0));
  }, [tileNum]);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.id = "tile_editor_canvas";
    canvasRef.current = canvas;
    const handleUnMount = (canvas: any) => {
      const ctx = canvas?.getContext("2d");

      if (ctx) {
        const newCanvasPixelArr = [];
        for (let i = 0; i < pixelData.length; i++) {
          for (let j = 0; j < pixelData[0].length; j++) {
            const pixel = pixelData[i][j];
            newCanvasPixelArr.push(pixel[0]);
            newCanvasPixelArr.push(pixel[1]);
            newCanvasPixelArr.push(pixel[2]);
            newCanvasPixelArr.push(pixel[3]);
          }
        }
        const newCanvasPixelData = new Uint8ClampedArray(newCanvasPixelArr);
        const newImageData = new ImageData(
          newCanvasPixelData,
          pixelData[0].length,
          pixelData.length
        );
        ctx.putImageData(newImageData, 0, 0);

        // update pixel data in global state on unmount
        dispatch(
          setNewBase64Image({
            tile: tileNum,
            image: newImageData,
            tileset: state.selectedTileset,
          })
        );
      }
    };

    // Pass the callback ref to the cleanup function
    return () => {
      handleUnMount(canvasRef.current);
      //remove canvas from dom by id
      const canvas = document.getElementById("tile_editor_canvas");
      canvas?.remove();
    };
  }, [pixelData]);

  const changePixel = (i: number, j: number) => {
    if (!isDragging.dragging || isDragging.mouseEvent != 0) return;
    if (
      pixelData[i][j][0] === projectState.colors[state.selectedColor].r &&
      pixelData[i][j][1] === projectState.colors[state.selectedColor].g &&
      pixelData[i][j][2] === projectState.colors[state.selectedColor].b &&
      pixelData[i][j][3] === projectState.colors[state.selectedColor].a
    )
      return;
    setPixelData((prevPixelData) => {
      const newPixelData = [...prevPixelData];
      if (typeof state.selectedColor !== "number") return newPixelData;
      newPixelData[i][j] = [
        projectState.colors[state.selectedColor].r,
        projectState.colors[state.selectedColor].g,
        projectState.colors[state.selectedColor].b,
        projectState.colors[state.selectedColor].a * 255,
      ];

      return newPixelData;
    });
  };

  const removePixel = (i: number, j: number) => {
    if (!isDragging.dragging || isDragging.mouseEvent != 2) return;

    setPixelData((prevPixelData) => {
      const newPixelData = [...prevPixelData];
      newPixelData[i][j] = [0, 0, 0, 0];

      return newPixelData;
    });
  };

  const handleMouseScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    setZoom((prevZoom) => {
      const scrollSpeed = 2;
      const newZoom = prevZoom + (e.deltaY > 0 ? -scrollSpeed : scrollSpeed);
      // zoom bounds
      if (newZoom < 1) return 1;
      if (newZoom > 100) return 100;
      return newZoom;
    });
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging({ dragging: true, mouseEvent: e.button });
    handleMouseMove(e);
    console.log(e);
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging({ dragging: false, mouseEvent: 0 });
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging.dragging) {
      //left click
      if (isDragging.mouseEvent === 0) {
        // place pixel based on currentPixelHover
        changePixel(currentPixelHover.x, currentPixelHover.y);
      } else if (isDragging.mouseEvent === 1) {
        setPosition((prevPosition: any) => ({
          x: prevPosition.x + e.movementX,
          y: prevPosition.y + e.movementY,
        }));
      } else if (isDragging.mouseEvent === 2) {
        // place pixel based on currentPixelHover
        removePixel(currentPixelHover.x, currentPixelHover.y);
      }
    }
  };

  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {};

    window.addEventListener("keydown", keyListener);
    return () => {
      window.removeEventListener("keydown", keyListener);
    };
  }, []);

  useEffect(() => {
    const base64Image = `data:image/png;base64,${state.selectedTileset.base64}`;
    if (base64Image && canvasRef.current) {
      const img = new Image();
      img.src = base64Image;

      img.onload = () => {
        const canvas = canvasRef.current;

        if (canvas) {
          const ctx = canvas.getContext("2d", { willReadFrequently: true });

          if (ctx) {
            const tileWidth = state.selectedTileset.tileWidth;
            const tileHeight = state.selectedTileset.tileHeight;
            const tilesPerRow = Math.floor(img.width / tileWidth);

            // Calculate the position of the selected tile in the tileset
            const tileX = (state.selectedTile % tilesPerRow) * tileWidth;
            const tileY =
              Math.floor(state.selectedTile / tilesPerRow) * tileHeight;

            // Resize the canvas to the size of the tile
            canvas.width = tileWidth;
            canvas.height = tileHeight;

            // Draw only the selected tile onto the canvas
            ctx.drawImage(
              img,
              tileX,
              tileY,
              tileWidth,
              tileHeight,
              0,
              0,
              tileWidth,
              tileHeight
            );
            const imageData = ctx.getImageData(0, 0, tileWidth, tileHeight);
            const pixelData = imageData.data;

            // Process the pixelArray if needed
            const pixelValues = [];
            for (let i = 0; i < pixelData.length; i += 4) {
              // Each pixel is represented by four consecutive values (R, G, B, A)
              const pixel = [
                pixelData[i],
                pixelData[i + 1],
                pixelData[i + 2],
                pixelData[i + 3],
              ];
              pixelValues.push(pixel);
            }

            // Convert the 1D array to a 2D array (assuming 32x32 image)
            const pixelValues2D = [];
            for (let i = 0; i < pixelValues.length; i += tileWidth) {
              pixelValues2D.push(pixelValues.slice(i, i + tileHeight));
            }

            setPixelData(pixelValues2D);
          }
        }
      };
    } else {
      console.log("No base64Image");
    }
  }, [state.selectedTileset.base64]);

  return (
    <div
      className='tile-editor w-full min-w-max h-full overflow-hidden flex justify-center items-center'
      onWheel={handleMouseScroll}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className='tile-editor-grid'
        style={{
          transform: `scale(${zoom})`,
          display: "grid",
          gridTemplateColumns: `repeat(${pixelData[0]?.length || 0}, 1fr)`,
          gridTemplateRows: `repeat(${pixelData?.length || 0}, 1fr)`,
          position: "relative",
          top: `${position.y}px`,
          left: `${position.x}px`,
        }}
      >
        {pixelData.map((row, i) =>
          row.map((pixel, j) => (
            <div
              key={`${i}-${j}`}
              onMouseEnter={() =>
                setCurrentPixelHover({
                  x: i,
                  y: j,
                })
              }
            >
              <RenderPixel row={i} col={j} pixel={pixel} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TileEditor;
