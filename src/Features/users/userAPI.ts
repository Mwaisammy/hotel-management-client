import { ApiDomain } from '@/utils/APIDomain'
import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
export type TUser = {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    contactPhone: number,
    address: string,
    password: string,
    role: string,
    isVerified: string,
    avatar: string,
    createdAt: string,
    updatedAt: string,
   

   
}
export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain
    }),
    tagTypes:['Users'],
    endpoints: (builder) => ({
        createUsers: builder.mutation<TUser ,Partial <TUser>>({
            query: (newUser) => ({
                url: '/auth/register',
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ['Users']
        }),

          verifyUser: builder.mutation<{message: string}, {email: string, verificationCode: string}>({
        query: (data) => ({
            url: '/auth/verify',
            method: 'POST',
            body: data
        })
    })
    }),
  
})