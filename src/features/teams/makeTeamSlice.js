import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

import { resetAction } from "../action/actionSlice";

export const teamsAdapter = createEntityAdapter();
export const membersAdapter = createEntityAdapter();

export const teamsSelectors = teamsAdapter.getSelectors((state) => state.teams);
export const membersSelectors = membersAdapter.getSelectors(
  (state) => state.teams.members
);

export const teamSlice = createSlice({
  name: "teams",
  initialState: teamsAdapter.getInitialState({
    members: membersAdapter.getInitialState(),
  }),
  reducers: {
    addTeam: teamsAdapter.addOne,
    deleteTeam: (state, { payload: teamId }) => {
      let members = teamsAdapter
        .getSelectors()
        .selectById(state, teamId).members;
      //get a list of members from the team
      for (const index in members) {
        console.log(members[index].memberId);
        membersAdapter.removeOne(state.members, members[index].memberId);
      }
      //remove each member in the list from the membersEntity
      teamsAdapter.removeOne(state, teamId);
      //remove the team
    },
    updateTeam: teamsAdapter.updateOne,
    addMember: (state, { payload: { teamId, member } }) => {
      const memberId = member.id;
      //make a deep clone of member
      const memberCopy = JSON.parse(JSON.stringify(member));
      //give the member its teamId
      memberCopy.teamId = teamId;
      //create random ID
      membersAdapter.addOne(state.members, {
        id: memberId,
        teamId: teamId,
        member: memberCopy,
      });
      //add member to list of active members
      const teamArray = JSON.parse(
        JSON.stringify(
          teamsAdapter.getSelectors().selectById(state, teamId).members
        )
      );
      //create a deep clone of the array that tracks the members for each team
      teamArray.push({ memberId: memberId, member: memberCopy });
      //push the new memberId to the array
      //this is how we connect the members to their team
      //the member should know its teamId and the team knows its memberIds
      teamsAdapter.updateOne(state, {
        id: teamId,
        changes: { members: teamArray },
      });
      //update the team with the new memberIds array
    },
    updateMember: (state, { payload: member }) => {
      //update the members entity with the new member
      // console.log(member);
      membersAdapter.updateOne(state.members, {
        id: member.id,
        changes: { member: member },
      });
      //create a deep copy of the member's team member array
      const teamArray = JSON.parse(
        JSON.stringify(
          teamsAdapter.getSelectors().selectById(state, member.teamId).members
        )
      );
      //map through the array updating the designated member
      let updatedTeamArray = teamArray.map((teamMember) => {
        if (teamMember.memberId === member.id) {
          return { memberId: member.id, member: member };
        } else {
          return teamMember;
        }
      });
      //update the team with the new member array
      teamsAdapter.updateOne(state, {
        id: member.teamId,
        changes: { members: updatedTeamArray },
      });
    },
    removeMember: (state, { payload: memberId }) => {
      let teamId = membersAdapter
        .getSelectors()
        .selectById(state.members, memberId).teamId;
      //get the teamId from the member that will be deleted
      let teamArray = JSON.parse(
        JSON.stringify(
          teamsAdapter.getSelectors().selectById(state, teamId).members
        )
      );
      //create a deep copy of the team array
      teamArray = teamArray.filter((member) => member.memberId !== memberId);
      //remove the the member from the team array
      teamsAdapter.updateOne(state, {
        id: teamId,
        changes: { members: teamArray },
      });
      //update the team with the new team array
      membersAdapter.removeOne(state.members, memberId);
      //remove the member from the membersEntity
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
  extraReducers: (builder) => {
    builder.addCase(resetAction, (state, { payload: actionState }) => {
      console.log(actionState.targets);
      const targetEntities = actionState.targets.entities;
      const targetIds = actionState.targets.ids;
      console.log(targetIds);

      targetIds.forEach((id) => {
        console.log(targetEntities[id]);
        membersAdapter.updateOne(state.members, {
          id: id,
          changes: { member: targetEntities[id] },
        });
      });
      //update the members entity with the new member
      // console.log(member);
      // membersAdapter.updateOne(state.members, {
      //   id: member.id,
      //   changes: { member: member },
      // });
      // //create a deep copy of the member's team member array
      // const teamArray = JSON.parse(
      //   JSON.stringify(
      //     teamsAdapter.getSelectors().selectById(state, member.teamId).members
      //   )
      // );
      // //map through the array updating the designated member
      // let updatedTeamArray = teamArray.map((teamMember) => {
      //   if (teamMember.memberId === member.id) {
      //     return { memberId: member.id, member: member };
      //   } else {
      //     return teamMember;
      //   }
      // });
      // //update the team with the new member array
      // teamsAdapter.updateOne(state, {
      //   id: member.teamId,
      //   changes: { members: updatedTeamArray },
      // });
    });
  },
});

export const {
  addTeam,
  deleteTeam,
  addMember,
  updateTeam,
  getTeams,
  setInspect,
  toggleInspect,
  removeMember,
  updateMember,
} = teamSlice.actions;

export default teamSlice.reducer;
