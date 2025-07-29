import type { RootState } from "@/store/store";
import { ApiDomain } from "@/utils/APIDomain";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type TRoom = {
  hotelId: number;
  roomId: number;
  roomType: string;
  pricePerNight: string;
  capacity: number;
  amenities: string;
  isAvailable: boolean;
};

export const roomsAPI = createApi({
  reducerPath: "roomsAPI",
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

  tagTypes: ["rooms"],

  endpoints: (builder) => ({
    createRooms: builder.mutation<TRoom, Partial<TRoom>>({
      query: (data) => ({
        url: "/room",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["rooms"],
    }),
    getRoom: builder.query<TRoom[], void>({
      query: () => ({
        url: "/rooms",
      }),
      transformResponse: (response: { message: TRoom[] }) => response.message,
      providesTags: ["rooms"],
    }),

    updateRoom: builder.mutation<TRoom, Partial<TRoom> & { id: number }>({
      query: ({ id, ...updatedrooms }) => ({
        url: `/room/${id}`,
        method: "PUT",
        body: updatedrooms,
      }),
      invalidatesTags: ["rooms"],
    }),

    deleteRoom: builder.mutation<void, number>({
      query: (roomId) => ({
        url: `/room/${roomId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["rooms"],
    }),
    getRoomById: builder.query<TRoom, number>({
      query: (roomId) => `/room/${roomId}`,
      transformResponse: (response: { message: TRoom }) => response.message,
      providesTags: ["rooms"],
    }),
    getRoomByHotelId: builder.query<TRoom[], number>({
      query: (hotelId) => `/rooms/hotel/${hotelId}`,
      // transformResponse: (response: { message: TRoom[] }) => response.message,
      providesTags: ["rooms"],
    }),
  }),
});
