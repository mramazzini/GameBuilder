import {
  ADD_TO_MAP_HISTORY,
  CLEAR_REMOVED_MAP_HISTORY,
} from "../../../utils/GlobalState/actions";
import { MapState } from "../../../utils/types";

class MapContainerMouseListener {
  dispatch: any;
  projectDispatch: any;

  setPosition: Function;
  setIsDragging: Function;
  setZoomLevel: Function;

  constructor(
    dispatch: any,
    projectDispatch: any,

    setPosition: Function,
    setIsDragging: Function,
    setZoomLevel: Function
  ) {
    this.dispatch = dispatch;
    this.projectDispatch = projectDispatch;

    this.setPosition = setPosition;
    this.setIsDragging = setIsDragging;
    this.setZoomLevel = setZoomLevel;
  }

  handleZoomIn = (state: MapState, zoomLevel: number) => {
    const maxZoom = 128 / state.selectedTileset.tileWidth;
    if (zoomLevel >= maxZoom) return;
    this.setZoomLevel((prevZoom: any) => (prevZoom *= 1.1));
  };
  handleZoomOut = (state: MapState, zoomLevel: number) => {
    const minZoom = 8 / state.selectedTileset.tileWidth;
    if (zoomLevel <= minZoom) return;

    this.setZoomLevel((prevZoom: any) => Math.max(0.01, (prevZoom *= 0.9)));
  };
  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    this.setIsDragging({ dragging: true, mouseEvent: e.button });
  };
  handleMouseUp = (
    e: React.MouseEvent<HTMLDivElement>,

    isDragging: { dragging: boolean; mouseEvent: number },
    state: MapState,
    currentTileHover: any
  ) => {
    this.setIsDragging({ dragging: false, mouseEvent: 0 });
    this.handleMouseMove(e, isDragging, state, currentTileHover);
  };
  handleMouseMove = async (
    e: React.MouseEvent<HTMLDivElement>,
    isDragging: { dragging: boolean; mouseEvent: number },
    state: MapState,
    currentTileHover: any
  ) => {
    if (isDragging.dragging) {
      //left click or right click
      if (isDragging.mouseEvent === 0 || isDragging.mouseEvent === 2) {
        if (state.selectedLayer == -1) {
          //prevent repeat
          if (
            state.selectedMap.colliders[currentTileHover[0]][
              currentTileHover[1]
            ] === (isDragging.mouseEvent === 0 ? true : false)
          )
            return;
          //add colliders instead of tiles
          const newMap = { ...state.selectedMap };
          const newColliders = [...newMap.colliders];
          newColliders[currentTileHover[0]][currentTileHover[1]] =
            isDragging.mouseEvent === 0 ? true : false;
          newMap.colliders = newColliders;
          return;
        }
        //check if tile attempting to be placed is the same as the one already there
        if (
          isDragging.mouseEvent === 0 &&
          state.selectedMap.layers[state.selectedLayer].tiles[
            currentTileHover[0]
          ][currentTileHover[1]].srcX ===
            state.selectedTile % state.selectedTileset.columns &&
          state.selectedMap.layers[state.selectedLayer].tiles[
            currentTileHover[0]
          ][currentTileHover[1]].srcY ===
            Math.floor(state.selectedTile / state.selectedTileset.columns)
        ) {
          return;
        }

        if (state.selectedTile === -1) return;

        const newMap = { ...state.selectedMap };

        const newTile =
          isDragging.mouseEvent === 0
            ? {
                srcX: state.selectedTile % state.selectedTileset.columns,
                srcY: Math.floor(
                  state.selectedTile / state.selectedTileset.columns
                ),
              }
            : {
                srcX: -1,
                srcY: -1,
              };
        const oldTile =
          newMap.layers[state.selectedLayer].tiles[currentTileHover[0]][
            currentTileHover[1]
          ];
        const payload = {
          mapTag: state.selectedMap.tag,
          tile: oldTile,
          tilePosition: currentTileHover,
        };

        await this.projectDispatch({
          type: ADD_TO_MAP_HISTORY,
          payload: payload,
        });

        newMap.layers[state.selectedLayer].tiles[currentTileHover[0]][
          currentTileHover[1]
        ] = newTile;
        await this.projectDispatch({
          type: CLEAR_REMOVED_MAP_HISTORY,
          payload: state.selectedMap.tag,
        });
        //add to history (for undo/redo)

        //middle mouse button click
      } else if (isDragging.mouseEvent === 1) {
        this.setPosition((prevPosition: any) => ({
          x: prevPosition.x + e.movementX,
          y: prevPosition.y + e.movementY,
        }));
      }
    }
  };

  handleScroll = (
    e: React.WheelEvent<HTMLDivElement>,
    state: MapState,
    zoomLevel: number
  ) => {
    if (e.deltaY > 0) {
      this.handleZoomOut(state, zoomLevel);
    } else {
      this.handleZoomIn(state, zoomLevel);
    }
  };
}
export default MapContainerMouseListener;
