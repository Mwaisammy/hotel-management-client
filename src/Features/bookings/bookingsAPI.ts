import type { RootState } from "@/store/store";
import { ApiDomain } from "@/utils/APIDomain";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export type TBookings = {
    userId: number;
    roomId: number;
    bookingId: number;
    checkInDate: string;
    checkOutDate: string;
    totalAmount: number;
    bookingStatus: string; 
}



export const bookingsAPI = createApi({
    reducerPath: 'bookingsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).user.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),

    tagTypes: ['Bookings'],

    endpoints: (builder) => ({
        createBookings: builder.mutation<TBookings, Partial<TBookings>>({
            query: (data) => ({
                url: '/booking',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Bookings'],

        }),
       getBookings: builder.query<TBookings[], void>({
  query: () => ({
    url: '/bookings',
  }),
  transformResponse: (response: { Bookings: TBookings[] }) => response.Bookings,
  providesTags: ['Bookings'],
}),

     updateBookings: builder.mutation<TBookings, Partial<TBookings> & { id: number }>({
  query: ({id, ...updatedBookings}) => ({
    url: `/booking/${id}`,
    method: 'PUT',
    body: updatedBookings,
  }),
  invalidatesTags: ['Bookings'],
}),

        deleteBookings: builder.mutation<void, number>({
            query: (bookingId) => ({
                url: `/booking/${bookingId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Bookings'],
        }),

       getBookingsByUserId: builder.query<TBookings[], number>({
  query: (userId) => `/bookings/user/${userId}`,
  transformResponse: (response: { bookings: TBookings[] }) => response.bookings,
  providesTags: ['Bookings'],
}),

    }),
}) 