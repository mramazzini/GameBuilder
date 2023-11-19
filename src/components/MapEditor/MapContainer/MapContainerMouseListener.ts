import {
  ADD_TO_MAP_HISTORY,
  CLEAR_REMOVED_MAP_HISTORY,
} from "../../../utils/GlobalState/actions";
import { MapState } from "../../../utils/types";

class MapContainerMouseListener {
  dispatch: any;
  projectDispatch: any;
  setBeenPlaced: Function;
  setPosition: Function;
  setIsDragging: Function;
  setZoomLevel: Function;

  constructor(
    dispatch: any,
    projectDispatch: any,
    setBeenPlaced: Function,
    setPosition: Function,
    setIsDragging: Function,
    setZoomLevel: Function
  ) {
    this.dispatch = dispatch;
    this.projectDispatch = projectDispatch;
    this.setBeenPlaced = setBeenPlaced;
    this.setPosition = setPosition;
    this.setIsDragging = setIsDragging;
    this.setZoomLevel = setZoomLevel;
  }

  handleZoomIn = (zoomLevel: number) => {
    const maxZoom = 5;
    if (zoomLevel >= maxZoom) return;
    this.setZoomLevel((prevZoom: any) => prevZoom + 0.1);
  };
  handleZoomOut = (state: MapState, zoomLevel: number) => {
    const minZoom =
      state.selectedMap.sizeX / state.selectedTileset.tileWidth / 3;
    if (zoomLevel <= minZoom) return;

    this.setZoomLevel((prevZoom: any) => Math.max(0.1, prevZoom - 0.1));
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
  handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    isDragging: { dragging: boolean; mouseEvent: number },
    state: MapState,
    currentTileHover: any
  ) => {
    if (isDragging.dragging) {
      //left click
      if (isDragging.mouseEvent === 0) {
        //check if tile attempting to be placed is the same as the one already there
        if (
          state.selectedMap.tiles[currentTileHover[0]][currentTileHover[1]]
            .srcX ===
            state.selectedTile % state.selectedTileset.columns &&
          state.selectedMap.tiles[currentTileHover[0]][currentTileHover[1]]
            .srcY ===
            Math.floor(state.selectedTile / state.selectedTileset.columns) &&
          state.selectedMap.tiles[currentTileHover[0]][currentTileHover[1]]
            .collider === state.addingCollider
        ) {
          return;
        }

        if (state.selectedTile === -1) return;

        const newMap = { ...state.selectedMap };
        let willAddColliderToTile = false;
        if (state.addingCollider && state.colliderVision) {
          willAddColliderToTile = true;
        }
        const newTile = {
          collider: willAddColliderToTile,

          srcX: state.selectedTile % state.selectedTileset.columns,
          srcY: Math.floor(state.selectedTile / state.selectedTileset.columns),
        };
        const oldTile = newMap.tiles[currentTileHover[0]][currentTileHover[1]];
        const payload = {
          mapTag: state.selectedMap.tag,
          tile: oldTile,
          tilePosition: currentTileHover,
        };

        this.projectDispatch({
          type: ADD_TO_MAP_HISTORY,
          payload: payload,
        });

        newMap.tiles[currentTileHover[0]][currentTileHover[1]] = newTile;
        this.projectDispatch({
          type: CLEAR_REMOVED_MAP_HISTORY,
          payload: state.selectedMap.tag,
        });
        //add to history (for undo/redo)

        this.setBeenPlaced(true);
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
    // You can customize the sensitivity of zooming by adjusting the multiplier
    const zoomMultiplier = 0.001;

    if (e.deltaY > 0) {
      this.handleZoomOut(state, zoomLevel);
    } else {
      this.handleZoomIn(zoomLevel);
    }
  };
}
export default MapContainerMouseListener;
