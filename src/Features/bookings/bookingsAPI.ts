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

    // "bookingId": 5,
    // "userId": 5,
    // "roomId": 5,
    // "checkInDate": "2025-07-30T00:00:00.000Z",
    // "checkOutDate": "2025-08-05T00:00:00.000Z",
    // "totalAmount": "36000.00",
    // "bookingStatus": "Confirmed"


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
                url: `/bookings/${bookingId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Bookings'],
        }),
    }),
})