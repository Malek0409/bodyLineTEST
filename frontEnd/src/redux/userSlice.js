import { createSlice } from "@reduxjs/toolkit";

const initialState = {

firstName : "",
lastName: "",
email: "",
picture: "",




}


export const userSlice = createSlice({

    name: "user",
    initialState,
    reducers: {
        loginRedux: (state, action) => {
            console.log(action.payload.data)
            state.firstName = action.payload.data.firstName
            state.lastName = action.payload.data.lastName
            state.email = action.payload.data.email
            state.picture = action.payload.data.picture
        },
        logoutRedux: (state, action) => {
            
            state.firstName = ""
            state.lastName = ""
            state.email = ""
            state.picture = ""
        }
    }
}) 

export const {loginRedux, logoutRedux} = userSlice.actions
export default userSlice.reducer