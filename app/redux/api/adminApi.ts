import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "~/types";

const api_base_url = import.meta.env.VITE_API_BASE_URL;
const session_token_key = import.meta.env.VITE_SESSION_TOKEN_KEY;

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api_base_url + "/admin",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem(session_token_key);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllAdmin: builder.query<
      { list: User[]; lastPage: number },
      { page?: number; search?: string }
    >({
      query: ({ page, search }) => ({
        url: `/?${page && `page=${page}`}${search && `&search=${search}`}`,
        method: "GET",
      }),
      transformResponse: (result: {
        success: boolean;
        data: { list: User[]; lastPage: number };
      }) => result.data,
    }),
  }),
});

export const { useGetAllAdminQuery } = adminApi;
