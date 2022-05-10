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
          teamsAdapter.getSelectors().selectById(state, teamId).members
        )
      );
      //create a deep clone of the array that tracks the members for each team
      teamArray.push({ memberId: memberId, member: member });
      //push the new memberId to the array
      //this is how we connect the members to their team
      //the member should know its teamId and the team knows its memberIds
      teamsAdapter.updateOne(state, {
        id: teamId,
        changes: { members: teamArray },
      });
      //update the team with the new memberIds array
    },
    removeMember: (state, { payload: memberId }) => {
      let _member = membersAdapter.getSelectors().selectById(state.members, memberId);
      console.log(_member);
    },
    setInspect: (state, { payload: { teamId, bool } }) => {
      teamsAdapter.updateOne(state, {
        id: teamId,
        changes: { inspect: bool },
      });
    },
    toggleInspect: (state, { payload: teamId }) => {
      let bool = teamsAdapter.getSelectors().selectById(state, teamId).inspect;
      teamsAdapter.updateOne(state, {
        id: teamId,
        changes: { inspect: !bool },
      });
    },
  },
});

export const {
  addTeam,
  addMember,
  updateTeam,
  getTeams,
  setInspect,
  toggleInspect,
  removeMember,
} = teamSlice.actions;

export default teamSlice.reducer;
