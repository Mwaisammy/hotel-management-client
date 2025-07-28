import { ApiDomain } from '@/utils/APIDomain'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type TUser = {
  userId: number
  firstname: string
  lastname: string
  email: string
  contactPhone: number
  address: string
  password: string
  role: string
  isVerified: string
  imageUrl: string
  createdAt: string
  updatedAt: string
}

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    createUsers: builder.mutation<TUser, Partial<TUser>>({
      query: (newUser) => ({
        url: '/auth/register',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['Users'],
    }),

    verifyUser: builder.mutation<
      { message: string },
      { email: string; verificationCode: string }>({
      query: (data) => ({
        url: '/auth/verify',
        method: 'POST',
        body: data,
      }),
    }),

    getUsers: builder.query<TUser[], void>({
      query: () => '/users',
      transformResponse: (response: { message: TUser[] }) => response.message,
        providesTags: ['Users']
    }),

    updateUser: builder.mutation<TUser, Partial<TUser> & { id: number }>({
      query: (updatedUser) => ({
        url: `/user/${updatedUser.id}`,
        method: 'PUT',
        body: updatedUser,
      }),
      invalidatesTags: ['Users'],
    }),

    getUserById: builder.query<TUser, number>({
      query: (id) => `/user/${id}`,
    }),
  }),
})
