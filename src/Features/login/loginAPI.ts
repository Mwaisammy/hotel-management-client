import { ApiDomain } from "@/utils/APIDomain"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export type TLoginResponse = {
    token: string,
    user: {
        userId: string,
        firstname: string,
        lastname: string,
        email: string,
        role: string,
        
    }
}


type LoginInputs = {
    email: string,
    password: string
}

export const loginAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain
    }),
    tagTypes:['Login'],
    endpoints: (builder) => ({
        loginUser: builder.mutation<TLoginResponse ,LoginInputs>({
            query: (loginData) => ({
                url: '/auth/login',
                method: 'POST',
                body: loginData
            }),
            invalidatesTags: ['Login']
        })
    })
})