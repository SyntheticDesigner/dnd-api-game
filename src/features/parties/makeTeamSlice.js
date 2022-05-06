import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { generateKey } from "../../utils/utils";
import { makePartySlice } from "./makePartySlice";

export const teamsAdapter = createEntityAdapter();
export const teamsSelectors = teamsAdapter.getSelectors((state)=>state.makeTeams);

export const makeTeamSlice = createSlice({
  name: "makeTeams",
  initialState: teamsAdapter.getInitialState(),
  // initialState: {
  //   teams: [],
  //   selectedTeam: {},
  // },
  reducers: {
    // makeTeam: (state, action) => {
    //   let _teamId = generateKey(`team${state.teams.length + 1}`);
    //   let _team = {
    //     teamMembers: action.payload,
    //     teamId: _teamId,
    //   };
    //   state.teams.push(_team);
    // },
    selectTeam: (state, action) => {
      state.teams.forEach((team) => {
        if (team.teamId === action.payload) {
          state.selectedTeam = team;
        }
      });
    },
    addTeam: teamsAdapter.addOne,
    updateTeam: teamsAdapter.updateOne,
  },
});

export const { makeTeam, selectTeam, addTeam, updateTeam } = makeTeamSlice.actions;

export const teamRoster = (state) => state.makeTeams.teams;
export const selectedTeam = (state) => state.makeTeams.selectedTeam;

export default makeTeamSlice.reducer;
