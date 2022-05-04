import { createSlice } from "@reduxjs/toolkit";

export const makePartySlice = createSlice({
  name: "makeParty",
  initialState: {
    partyArray: [],
  },
  reducers: {
    addPartyMember: (state, action) => {
      state.partyArray.push(action.payload);
    },
    setParty: (state, action) => {
      state.partyArray = action.payload;
    }
  },
});

export const { addPartyMember, setParty } = makePartySlice.actions;

export const partyMembers = (state) => state.makeParty.partyArray;

export default makePartySlice.reducer;
