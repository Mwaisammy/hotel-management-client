import type { RootState } from "@/store/store";
import { ApiDomain } from "@/utils/APIDomain";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type TSupportTicket = {
  userId: number;
  description: string;
  ticketId: number;
  subject: string;
  status: string;
};

export const ticketsAPI = createApi({
  reducerPath: "ticketsAPI",
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

  tagTypes: ["tickets"],

  endpoints: (builder) => ({
    createTickets: builder.mutation<TSupportTicket, Partial<TSupportTicket>>({
      query: (data) => ({
        url: "/ticket",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["tickets"],
    }),
    getSupportTicket: builder.query<TSupportTicket[], void>({
      query: () => ({
        url: "/tickets",
      }),
      transformResponse: (response: { message: TSupportTicket[] }) =>
        response.message,
      providesTags: ["tickets"],
    }),

    updateticket: builder.mutation<
      TSupportTicket,
      Partial<TSupportTicket> & { id: number }
    >({
      query: ({ id, ...updatedTickets }) => ({
        url: `/ticket/${id}`,
        method: "PUT",
        body: updatedTickets,
      }),
      invalidatesTags: ["tickets"],
    }),

    deleteticket: builder.mutation<void, number>({
      query: (ticketId) => ({
        url: `/ticket/${ticketId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tickets"],
    }),
  }),
});
