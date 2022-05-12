import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

export const teamsAdapter = createEntityAdapter();
export const membersAdapter = createEntityAdapter();

export const teamsSelectors = teamsAdapter.getSelectors((state) => state.teams);

export const teamSlice = createSlice({
  name: "teams",
  initialState: teamsAdapter.getInitialState({}),
  reducers: {
    addTeam: (state, { payload: id }) => {
      teamsAdapter.addOne(state, {
        id,
        members: membersAdapter.getInitialState(),
      });
    },
    updateTeam: teamsAdapter.updateOne,
    addMember: (state, { payload: { teamId, member } }) => {
      //copy the current state of members to memberState
      const membersState = teamsAdapter.getSelectors().selectById(state, teamId).members;
      //generate a new state from the previous with additional content
      const newState = membersAdapter.addOne(membersState, {
        id: nanoid(),
        member: member,
      });
      //update the state in the teams adapter
      teamsAdapter.updateOne(state, {id: teamId, changes: {members: newState}});
      //this simulates mutating nested entity states.
    },
  },
});

export const { addTeam, addMember, updateTeam, getTeams } = teamSlice.actions;

export const teamRoster = (state) => state.teams.teams;
export const selectedTeam = (state) => state.teams.selectedTeam;

export default teamSlice.reducer;
