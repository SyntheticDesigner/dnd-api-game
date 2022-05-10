import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

export const teamsAdapter = createEntityAdapter();
export const membersAdapter = createEntityAdapter();

export const teamsSelectors = teamsAdapter.getSelectors((state) => state.teams);
export const memberSelectors = membersAdapter.getSelectors(
  (state) => state.teams.members
);

export const teamSlice = createSlice({
  name: "teams",
  initialState: teamsAdapter.getInitialState({
    members: membersAdapter.getInitialState(),
  }),
  reducers: {
    addTeam: teamsAdapter.addOne,
    updateTeam: teamsAdapter.updateOne,
    addMember: (state, { payload: { teamId, member } }) => {
      const memberId = nanoid();
      //create random ID
      console.log(teamId);
      membersAdapter.addOne(state.members, {
        id: memberId,
        member: member,
        teamId: teamId,
      });
      //add member to list of active members
      const teamArray = JSON.parse(
        JSON.stringify(
          teamsAdapter.getSelectors().selectById(state, teamId).memberIds
        )
      );
      //create a deep clone of the array that tracks the members for each team
      teamArray.push(memberId);
      //push the new memberId to the array
      //this is how we connect the members to their team
      //the member should know its teamId and the team knows its memberIds
      teamsAdapter.updateOne(state, {
        id: teamId,
        changes: { memberIds: teamArray },
      });
      //update the team with the new memberIds array
    },
  },
});

export const { addTeam, addMember, updateTeam, getTeams } = teamSlice.actions;

export const teamRoster = (state) => state.teams.teams;
export const selectedTeam = (state) => state.teams.selectedTeam;

export default teamSlice.reducer;
