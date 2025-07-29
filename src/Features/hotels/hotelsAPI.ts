import type { RootState } from "@/store/store";
import { ApiDomain } from "@/utils/APIDomain";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type THotel = {
  hotelId: number;
    name: string;
    location: string;
    address: string;
    contactPhone: string;
    category: string;
    rating: number;
    price: number
    description: string;
    amenities:string
};

export const hotelsAPI = createApi({
  reducerPath: "hotelsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  tagTypes: ["hotels"],

  endpoints: (builder) => ({
    createHotel: builder.mutation<THotel, Partial<THotel>>({
      query: (data) => ({
        url: "/hotel",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["hotels"],
    }),
    getHotels: builder.query<THotel[], void>({
      query: () => ({
        url: "/hotels",
      }),
      transformResponse: (response: { message: THotel[] }) => response.message,
      providesTags: ["hotels"],
    }),

    updateHotel: builder.mutation<THotel, Partial<THotel> & { id: number }>({
      query: ({ id, ...updatedHotel }) => ({
        url: `/hotel/${id}`,
        method: "PUT",
        body: updatedHotel,
      }),
      invalidatesTags: ["hotels"],
    }),

    deleteHotel: builder.mutation<void, number>({
      query: (hotelId) => ({
        url: `/hotel/${hotelId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["hotels"],
    }),
    getHotelById: builder.query<THotel, number>({
      query: (hotelId) => `/hotel/${hotelId}`,
      transformResponse: (response: { message: THotel }) => response.message,
      providesTags: ["hotels"],
    }),
  }),
});
