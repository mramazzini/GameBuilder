//redux store
import { configureStore } from "@reduxjs/toolkit";
import { ThunkDispatch } from "@reduxjs/toolkit";
import GlobalSlice from "./reducers/GlobalReducers";
import TilesetSlice from "./reducers/TilesetReducers";
import MapSlice from "./reducers/MapReducers";
import { useDispatch } from "react-redux";
const store = configureStore({
  reducer: {
    global: GlobalSlice,
    tileset: TilesetSlice,
    map: MapSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
//include thunks in AppDispatch export
export type AppDispatch = ThunkDispatch<RootState, any, any>;

export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}

export default store;
