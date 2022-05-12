import { createSlice } from '@reduxjs/toolkit'

const initialState = {

}

const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    newAction: (state, action)=>{
        console.log(action.payload);
    }
  }
});

export const {newAction} = battleSlice.actions;

export default battleSlice.reducer