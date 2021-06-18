import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userData: {
        userId: '',
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        acc: localStorage.getItem('acc'),
        ref: localStorage.getItem('ref'),
        isAuthenticated: false,
        date_joined: ''
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
            saveUser: (state, action) => {
                state.userData = action.payload
            },
    }
});

export const apiConfigurations = () => {
    return {
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('acc')}`
        }
    }
}

export const { saveUser } = userSlice.actions
export const selectUserData = state => state.user.userData
export default userSlice.reducer