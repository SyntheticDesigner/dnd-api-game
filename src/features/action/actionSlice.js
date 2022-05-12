import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  targets: [],
  action: {},
  attackRoll: 0,
  damageRoll: 0
}

const actionSlice = createSlice({
  name: "action",
  initialState,
  reducers: {
    newAction: (state, {payload : {action, actor}})=>{
        console.log(action);
        console.log(actor);
        state.action = action;
        state.user = actor;
        state.targets = actor.targeting;
    }
  }
});

export const {newAction} = actionSlice.actions;

export default actionSlice.reducer