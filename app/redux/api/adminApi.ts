import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AdminUser } from "~/types";

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
  tagTypes: ["admin"],
  endpoints: (builder) => ({
    getAllAdmin: builder.query<
      { list: AdminUser[]; lastPage: number },
      { page?: number; search?: string }
    >({
      query: ({ page, search }) => ({
        url: `/?${page && `&page=${page}`}${
          search && search?.length > 0 && `&search=${search}`
        }`,
        method: "GET",
      }),
      transformResponse: (result: {
        success: boolean;
        data: { list: AdminUser[]; lastPage: number };
      }) => result.data,
      providesTags: ["admin"],
    }),
    createAdmin: builder.mutation<
      void,
      {
        username: string;
        password: string;
      }
    >({
      query: (data) => ({
        url: `/`,
        method: "POST",
        body: {
          username: data.username,
          password: data.password,
          privilleges: "admin",
        },
      }),
      invalidatesTags: ["admin"],
    }),
    deleteAdmin: builder.mutation<void, number[]>({
      query: (ids) => ({
        url: `/`,
        method: "DELETE",
        body: {
          admins: ids,
        },
      }),
      invalidatesTags: ["admin"],
    }),
    adminChangePassword: builder.mutation<
      void,
      {
        oldPassword: string;
        newPassword: string;
      }
    >({
      query: (data) => ({
        url: "/password/change",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const {
  useGetAllAdminQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useAdminChangePasswordMutation,
} = adminApi;
