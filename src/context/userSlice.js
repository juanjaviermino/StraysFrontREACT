import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogged: false,
    user: {},
};

export const userlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveData: (state, action) => {
            const { user } = action.payload;
            state[user] = user;
        },
        loggin: (state) => {
            state.isLogged = true;
        },
        logout: (state) => {
            state.isLogged = false;
        },
    },
});


// Export the actions
export const { loggin, logout, saveData } = userlice.actions;

// Export the reducer
export default userlice.reducer;
