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
  // initialState: {
  //   partyArray: [],
  // },
  reducers: {
    addPartyMember: partyAdapter.addOne,
    deletePartyMember: partyAdapter.removeOne,
    updatePartyMember: partyAdapter.updateOne,
    addParty: partyAdapter.setAll,
    clearParty: partyAdapter.removeAll,
    addId: (state, action) => {
      state.id = action.payload;
    }
    // addPartyMember: (state, action) => {
    //   let memberId = generateKey(`member${state.partyArray.length + 1}`);
    //   let member = {
    //     info: action.payload,
    //     memberId: memberId,
    //   };
    //   state.partyArray.push(member);
    // },
    // setParty: (state, action) => {
    //   state.partyArray = action.payload;
    // },
    // deletePartyMember: (state, action) => {
    //   if (action.payload.length < 2) {
    //     alert(
    //       "Must specify the party you are deleting from and the member you are removing"
    //     );
    //   } else {
    //     state.PartyArray = action.payload[0].teamMembers;
    //     console.log(state.PartyArray);
    //     // let index = state.PartyArray.findIndex(({ memberId })=>memberId === action.payload[1]);
    //     state.PartyArray = state.PartyArray.filter(
    //       ({ memberId }) => memberId !== action.payload[1]
    //     );
    //     console.log(makeTeamSlice.actions.addTeam);
    //   }
    // },
  },
});

// store.dispatch(makePartySlice.actions.deletePartyMember());

export const { addPartyMember, deletePartyMember, updatePartyMember, addParty, clearParty, addId } =
  makePartySlice.actions;
export const partyId = (state) => state.makeParty.id;

export default makePartySlice.reducer;
