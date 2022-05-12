import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  receivers: [{}],
  action: {}
}

const actionSlice = createSlice({
  name: "action",
  initialState,
  reducers: {
    newAction: (state, action)=>{
        console.log(action.payload);
    }
  }
});

export const {newAction} = actionSlice.actions;

export default actionSlice.reducer