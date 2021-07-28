import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import boardReducer from "./slices/board/boardSlice";

const store = configureStore({
  reducer: {
    game: boardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;

export default store;