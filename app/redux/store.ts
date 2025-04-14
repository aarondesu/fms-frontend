import { configureStore } from "@reduxjs/toolkit";
import { adminAuthApi } from "./api/adminAuthApi";

export const store = configureStore({
  reducer: {
    [adminAuthApi.reducerPath]: adminAuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([adminAuthApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
