import { RootState } from "../store";

import { Tileset } from "../../types";
import { AnyAction, Dispatch } from "redux";
import { attachNewBase64ToTileset } from "../reducers/GlobalReducers";
import { ThunkDispatch, ThunkAction } from "redux-thunk";

interface SetNewBase64ImagePayload {
  tile: number;
  tileset: Tileset;
  image: any;
}

export const setNewBase64Image = (
  payload: SetNewBase64ImagePayload
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const state: RootState = getState();
    const tile = payload.tile;
    const tileset = payload.tileset;
    const imageDataToReplaceTile = payload.image;

    //find tileset
    const tilesetIndex = state.global.tilesets.findIndex(
      (tilesetObject: Tileset) => tilesetObject.tag === tileset.tag
    );

    //update tileset base64 image data at tile with new image by
    // drawing it to a canvas
    const oldTilesetImage =
      "data:image/png;base64," + state.global.tilesets[tilesetIndex].base64;

    const image = new Image();
    image.src = oldTilesetImage;

    image.onload = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = tileset.tileWidth * tileset.columns;
      canvas.height = tileset.tileHeight * tileset.rows;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }
      ctx.drawImage(image, 0, 0);

      //get tile x and y based on tileset col and rows
      const tileX = tile % tileset.columns;
      const tileY = Math.floor(tile / tileset.columns);
      //set image data
      ctx.putImageData(
        imageDataToReplaceTile,
        tileX * tileset.tileWidth,
        tileY * tileset.tileHeight
      );
      //update base64 image
      const newBase64 = canvas.toDataURL("image/png").split(",")[1];

      //update tileset
      dispatch(
        attachNewBase64ToTileset({
          tag: tileset.tag,
          base64: newBase64,
        })
      );
    };

    return;
  };
};
