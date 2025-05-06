import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PaginateQueryResults, PaginateQueryArgs, Service } from "~/types";

const api_base_url = import.meta.env.VITE_API_BASE_URL;
const session_token_key = import.meta.env.VITE_SESSION_TOKEN_KEY;

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api_base_url + "/services",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem(session_token_key);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["service"],
  endpoints: (builder) => ({
    getAllServices: builder.query<
      PaginateQueryResults<Service>,
      PaginateQueryArgs
    >({
      query: ({ page, search }) => ({
        url: `/?${page && `&page=${page}`}${
          search && search.length > 0 && `&search=${search}`
        }`,
        method: "GET",
      }),
      providesTags: ["service"],
      transformResponse: (result: {
        success: boolean;
        data: {
          list: Service[];
          lastPage: number;
        };
      }) => result.data,
    }),
    createService: builder.mutation<void, void>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["service"],
    }),
  }),
});

export const { useGetAllServicesQuery, useCreateServiceMutation } = serviceApi;
