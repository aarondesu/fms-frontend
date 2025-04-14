import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api_base_url = import.meta.env.VITE_API_BASE_URL;

export const adminAuthApi = createApi({
  reducerPath: "adminAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api_base_url + "/admin/auth",
  }),
  endpoints: (builder) => ({
    login: builder.query<
      void,
      {
        username: string;
        password: string;
      }
    >({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLazyLoginQuery } = adminAuthApi;
