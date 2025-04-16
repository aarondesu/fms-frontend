import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "~/types";

const api_base_url = import.meta.env.VITE_API_BASE_URL;
const session_token_key = import.meta.env.VITE_SESSION_TOKEN_KEY;

export const adminAuthApi = createApi({
  reducerPath: "adminAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api_base_url + "/admin/auth",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem(session_token_key);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.query<
      string,
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
      transformResponse: (result: {
        success: boolean;
        data: { user: User; token: string };
      }) => result.data.token,
    }),
    getUser: builder.query<User, void>({
      query: () => ({
        url: "/user",
      }),
      transformResponse: (result: { success: boolean; data: User }) =>
        result.data,
    }),
  }),
});

export const { useLazyLoginQuery, useGetUserQuery, usePrefetch } = adminAuthApi;
