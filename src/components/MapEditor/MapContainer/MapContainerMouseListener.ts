import {
  addToMapHistory,
  clearRemovedMapHistory,
} from "../../../utils/redux/reducers/GlobalReducers";
import {
  setColliderAtSelectedMap,
  addTileToMap,
} from "../../../utils/redux/reducers/MapReducers";
import { MapState } from "../../../utils/types";

class MapContainerMouseListener {
  dispatch: any;

  setPosition: Function;
  setIsDragging: Function;
  setZoomLevel: Function;

  constructor(
    dispatch: any,

    setPosition: Function,
    setIsDragging: Function,
    setZoomLevel: Function
  ) {
    this.dispatch = dispatch;

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
    currentTileHover: { x: number; y: number }
  ) => {
    if (isDragging.dragging) {
      //left click or right click
      if (isDragging.mouseEvent === 0 || isDragging.mouseEvent === 2) {
        if (state.selectedLayer == -1) {
          //prevent repeat
          if (
            state.selectedMap.colliders[currentTileHover.y][
              currentTileHover.x
            ] === (isDragging.mouseEvent === 0 ? true : false)
          )
            return;

          this.dispatch(
            setColliderAtSelectedMap({
              tilePosition: currentTileHover,
              collider: isDragging.mouseEvent === 0 ? true : false,
            })
          );
          return;
        }
        //check if tile attempting to be placed is the same as the one already there
        if (
          isDragging.mouseEvent === 0 &&
          state.selectedMap.layers[state.selectedLayer].tiles[
            currentTileHover.y
          ][currentTileHover.x].srcX ===
            state.selectedTile % state.selectedTileset.columns &&
          state.selectedMap.layers[state.selectedLayer].tiles[
            currentTileHover.y
          ][currentTileHover.x].srcY ===
            Math.floor(state.selectedTile / state.selectedTileset.columns)
        ) {
          return;
        } else if (
          isDragging.mouseEvent === 2 &&
          state.selectedMap.layers[state.selectedLayer].tiles[
            currentTileHover.y
          ][currentTileHover.x].srcX === -1 &&
          state.selectedMap.layers[state.selectedLayer].tiles[
            currentTileHover.y
          ][currentTileHover.x].srcY === -1
        ) {
          return;
        }

        if (state.selectedTile === -1) return;

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
          state.selectedMap.layers[state.selectedLayer].tiles[
            currentTileHover.y
          ][currentTileHover.x];
        const payload = {
          mapTag: state.selectedMap.tag,
          tile: oldTile,
          newTile: newTile,
          tilePosition: currentTileHover,
          layer: state.selectedLayer,
        };

        this.dispatch(addTileToMap(payload));
        this.dispatch(addToMapHistory(payload));
        this.dispatch(clearRemovedMapHistory(state.selectedMap.tag));

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
