import { createSlice } from '@reduxjs/toolkit';

export const addphonenumbers = createSlice({
    name: 'phonenumbers',
    initialState: {
        name : '',
        number1 : 0,
        number2 : 0,
        number3 : 0,
        ipaddress : '',
    },
    reducers: {
        // Can mutate state directly; Do it in a mutable way as compared to Redux
        addname : (state, action) => {
            state.name = action.payload.input;
        },
        addnumber1: (state, action) => {
            state.number1 = action.payload.input;
        },
        addnumber2: (state, action) => {
            state.number2 = action.payload.input;
        },
        addnumber3: (state, action) => {
            state.number3 = action.payload.input;
        },
        getipaddress: (state, action) => {
            state.ipaddress = action.payload.input;
        },
    }
});

// Export actions so that we can dispatch and invoke the functions from anywhere in our application
export const {
    addname,
    addnumber1,
    addnumber2,
    addnumber3,
    getipaddress,
} = addphonenumbers.actions;
export default addphonenumbers.reducer;
