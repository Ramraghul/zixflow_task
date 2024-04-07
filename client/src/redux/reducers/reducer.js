// Required Package Import
import { createSlice } from '@reduxjs/toolkit';

// InitialValue;
const initialState = {
    AllUserContact: [],
    loading: true,
};

// Reducer Mention;
const contactReducer = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        // Get All Contacts Reducer;
        getContact: (state, action) => {
            state.AllUserContact = action.payload;
            state.loading = false;
        },
    },
});

// Mention All The Reducer In ContactReducer;
export const { getContact, getContactById } = contactReducer.actions;

// Reducer Export;
export default contactReducer.reducer;
