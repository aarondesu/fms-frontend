import { configureStore } from "@reduxjs/toolkit";
import { adminAuthApi } from "./api/adminAuthApi";
import { adminApi } from "./api/adminApi";
import { serviceApi } from "./api/serviceApi";

export const store = configureStore({
  reducer: {
    [adminAuthApi.reducerPath]: adminAuthApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      adminAuthApi.middleware,
      adminApi.middleware,
      serviceApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
