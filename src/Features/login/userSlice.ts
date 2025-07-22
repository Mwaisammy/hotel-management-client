import { createSlice } from "@reduxjs/toolkit"

export type TLoginResponse = {
    token: string | null,
    user: {
        id: number,
        firstname: string,
        lastname: string,
        email: string,
        role: string,
       
    } | null
}

const initialState = {
    token: null,
    user: null
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token
            state.user = action.payload.user

        }, 
        logout: (state) => {
            state.token = null
            state.user = null
        }
    }
})


export const { loginSuccess } = userSlice.actions
export default userSlice.reducer