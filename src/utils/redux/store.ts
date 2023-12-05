//redux store
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import GlobalSlice from "./reducers/GlobalReducers";
import TilesetSlice from "./reducers/TilesetReducers";
import MapSlice from "./reducers/MapReducers";
const store = configureStore({
  reducer: {
    global: GlobalSlice,
    tileset: TilesetSlice,
    map: MapSlice,
  },
  middleware: [thunk],
});
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
