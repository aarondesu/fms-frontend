import { configureStore } from "@reduxjs/toolkit";
import { adminAuthApi } from "./api/adminAuthApi";
import { adminApi } from "./api/adminApi";

export const store = configureStore({
  reducer: {
    [adminAuthApi.reducerPath]: adminAuthApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      adminAuthApi.middleware,
      adminApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
