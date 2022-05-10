import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { generateKey } from "../../utils/utils";
import { makeTeamSlice, teamRoster } from "./makeTeamSlice";
import { getState } from "react-redux";
// import { store } from "../../app/store";

export const partyAdapter = createEntityAdapter();
export const partySelectors = partyAdapter.getSelectors(
  (state) => state.makeParty
);

export const makePartySlice = createSlice({
  name: "makeParty",
  initialState: partyAdapter.getInitialState({
    id: "",
  }),
  reducers: {
    addPartyMember: partyAdapter.addOne,
    deletePartyMember: partyAdapter.removeOne,
    updatePartyMember: partyAdapter.updateOne,
    addParty: partyAdapter.setAll,
    clearParty: partyAdapter.removeAll,
    addId: (state, action) => {
      state.id = action.payload;
    }
  },
});

// store.dispatch(makePartySlice.actions.deletePartyMember());

export const { addPartyMember, deletePartyMember, updatePartyMember, addParty, clearParty, addId } =
  makePartySlice.actions;
export const partyId = (state) => state.makeParty.id;

export default makePartySlice.reducer;
