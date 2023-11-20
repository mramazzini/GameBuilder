import { TilesetState } from "../../../utils/types";

const TilesetContainerKeyListener = (
  e: KeyboardEvent,
  dispatch: any,
  state: TilesetState,
  projectDispatch: any
) => {
  console.log(e.key);
};

export default TilesetContainerKeyListener;
