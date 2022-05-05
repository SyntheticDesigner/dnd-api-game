import { createSlice } from "@reduxjs/toolkit";
import { generateKey } from "../../utils/utils";
import { makeTeamSlice, teamRoster } from "./makeTeamSlice";
import { getState } from "react-redux";
// import { store } from "../../app/store";

export const makePartySlice = createSlice({
  name: "makeParty",
  initialState: {
    partyArray: [],
  },
  reducers: {
    addPartyMember: (state, action) => {
      let memberId = generateKey(`member${state.partyArray.length + 1}`);
      let member = {
        info: action.payload,
        memberId: memberId,
      };
      state.partyArray.push(member);
    },
    setParty: (state, action) => {
      state.partyArray = action.payload;
    },
    deletePartyMember: (state, action) => {
      if(action.payload.length < 2){
        alert(
          "Must specify the party you are deleting from and the member you are removing"
        )
      }else{
        state.PartyArray = action.payload[0].teamMembers;
        console.log(state.PartyArray);
        // let index = state.PartyArray.findIndex(({ memberId })=>memberId === action.payload[1]);
        state.PartyArray = state.PartyArray.filter(({ memberId })=>memberId !== action.payload[1]);
        console.log(makeTeamSlice.actions.addTeam);
      }
    },
  },
});

// store.dispatch(makePartySlice.actions.deletePartyMember());

export const { addPartyMember, setParty, deletePartyMember } =
  makePartySlice.actions;
export const partyMembers = (state) => state.makeParty.partyArray;

export default makePartySlice.reducer;
