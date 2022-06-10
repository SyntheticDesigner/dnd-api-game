import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { startRound } from "../play/playSlice";

import { resetAction } from "../action/actionSlice";

export const teamsAdapter = createEntityAdapter();
export const membersAdapter = createEntityAdapter();
export const acquiredAdapter = createEntityAdapter({
  selectId: (member) => member.actorObject.index,
  sortComparer: (a, b) =>
    a.actorObject.index.localeCompare(b.actorObject.index),
});

export const teamsSelectors = teamsAdapter.getSelectors((state) => state.teams);
export const membersSelectors = membersAdapter.getSelectors(
  (state) => state.teams.members
);
//access the acquired through the teams selector state.teams.entities[teamId].acquired

export const teamSlice = createSlice({
  name: "teams",
  initialState: teamsAdapter.getInitialState({
    members: membersAdapter.getInitialState(),
    teamSelected: "",
    round: 0,
  }),
  reducers: {
    addTeam: (state, { payload: { id, name } }) => {
      //refactored into playSlice
      teamsAdapter.addOne(state, {
        id: id,
        name: name,
        acquired: acquiredAdapter.getInitialState(),
        //acquired is initialized as a dynamic entity adapter
        members: [],
        health: 20,
      });
    },
    deleteTeam: (state, { payload: teamId }) => {
      //refactored into playSlice
      let members = teamsAdapter
        .getSelectors()
        .selectById(state, teamId).members;
      //get a list of members from the team
      for (const index in members) {
        console.log(members[index].memberId);
        membersAdapter.removeOne(state.members, members[index].memberId);
      }
      if (state.teamSelected === teamId) {
        state.teamSelected = "";
      }
      //remove each member in the list from the membersEntity
      teamsAdapter.removeOne(state, teamId);
      //remove the team
    },
    updateTeam: teamsAdapter.updateOne,
    addMember: (state, { payload: { teamId, member } }) => {
      //make a deep clone of member
      const memberCopy = JSON.parse(JSON.stringify(member));
      //give the member its teamId
      memberCopy.teamId = teamId;
      memberCopy.id = nanoid();
      //create random ID
      membersAdapter.addOne(state.members, {
        id: memberCopy.id,
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
      teamArray.push({ memberId: memberCopy.id, member: memberCopy });
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
    addFavorite: (state, { payload: { teamId, member } }) => {
      if (teamId) {
        const memberId = member.id;
        //make a deep clone of member
        const memberCopy = JSON.parse(JSON.stringify(member));
        memberCopy.hp = memberCopy.actorObject.hit_points;

        const acquiredState = teamsAdapter
          .getSelectors()
          .selectById(state, teamId).acquired;

        const newState = acquiredAdapter.addOne(acquiredState, memberCopy);
        teamsAdapter.updateOne(state, {
          id: teamId,
          changes: { acquired: newState },
        });
        // acquiredAdapter.addOne(state.playeracquired, {
        //   id: memberId,
        //   member: memberCopy,
        // });
      } else {
        alert("You must make or choose a team");
      }
    },
    removeFavorite: (state, { payload: memberId }) => {
      acquiredAdapter.removeOne(state.playerAcquired, memberId);
    },
    setTeamSelected: (state, { payload: teamId }) => {
      //refactored into playSlice
      state.teamSelected = teamId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAction, (state, { payload: actionState }) => {
      const targetEntities = actionState.targets.entities;
      const targetIds = actionState.targets.ids;
      console.log(targetIds);

      targetIds.forEach((id) => {
        //this if statement checks to see is the targets team id exists as a part of the teams
        //if it does not that means its an npc and will be handled by the playSlice
        if (
          teamsAdapter
            .getSelectors()
            .selectIds(state)
            .filter((teamId) => targetEntities[id].teamId === teamId).length > 0
        ) {
          const teamArray = JSON.parse(
            JSON.stringify(
              teamsAdapter
                .getSelectors()
                .selectById(state, targetEntities[id].teamId).members
            )
          );
          //map through the array updating the designated member
          let updatedTeamArray = teamArray.map((teamMember) => {
            if (teamMember.memberId === id) {
              return { memberId: id, member: targetEntities[id] };
            } else {
              return teamMember;
            }
          });
          teamsAdapter.updateOne(state, {
            id: targetEntities[id].teamId,
            changes: { members: updatedTeamArray },
          });

          membersAdapter.updateOne(state.members, {
            id: id,
            changes: { member: targetEntities[id] },
          });
        }
      });
    });
    builder.addCase(
      startRound,
      (state, { payload: { prevState: playState } }) => {
        state.round = playState.round + 1;
        // console.log(playState);
        if (playState.round === 0 && state.teamSelected) {
          let ids = [nanoid(), nanoid(), nanoid()];
          let berserker = playState.allMonsters.entities["berserker"];
          let knight = playState.allMonsters.entities["knight"];
          let priest = playState.allMonsters.entities["priest"];
          const starterTeam = [
            {
              id: ids[0],
              teamId: state.teamSelected,
              member: {
                id: ids[0],
                teamId: state.teamSelected,
                actorImage: `https://5e.tools/img/MM/${priest.name
                  .split(",")[0]
                  .split("/")[0]
                  .split("(")[0]
                  .trim()}.png`,
                actorPos: { x: 0, y: 0 },
                openInfo: false,
                actorObject: priest,
                ac: priest.armor_class,
                hp: priest.hit_points,
                targetedBy: "",
                targeting: {},
                targetMode: false,
              },
            },
            {
              id: ids[1],
              teamId: state.teamSelected,
              member: {
                id: ids[1],
                teamId: state.teamSelected,
                actorImage: `https://5e.tools/img/MM/${knight.name
                  .split(",")[0]
                  .split("/")[0]
                  .split("(")[0]
                  .trim()}.png`,
                actorPos: { x: 0, y: 0 },
                openInfo: false,
                actorObject: knight,
                ac: knight.armor_class,
                hp: knight.hit_points,
                targetedBy: "",
                targeting: {},
                targetMode: false,
              },
            },
            {
              id: ids[2],
              teamId: state.teamSelected,
              member: {
                id: ids[2],
                teamId: state.teamSelected,
                actorImage: `https://5e.tools/img/MM/${berserker.name
                  .split(",")[0]
                  .split("/")[0]
                  .split("(")[0]
                  .trim()}.png`,
                actorPos: { x: 0, y: 0 },
                openInfo: false,
                actorObject: berserker,
                ac: berserker.armor_class,
                hp: berserker.hit_points,
                targetedBy: "",
                targeting: {},
                targetMode: false,
              },
            },
          ];
          membersAdapter.addMany(state.members, starterTeam);
          // const teamArray = JSON.parse(
          //   JSON.stringify(
          //     teamsAdapter.getSelectors().selectById(state, state.teamSelected).members
          //   )
          // );
          let teamArray = starterTeam.map((member) => {
            return { memberId: member.id, member: member.member };
          });
          teamsAdapter.updateOne(state, {
            id: state.teamSelected,
            changes: { members: teamArray },
          });
          const acquiredState = teamsAdapter
            .getSelectors()
            .selectById(state, state.teamSelected).acquired;

          const newState = acquiredAdapter.addMany(
            acquiredState,
            starterTeam.map((member) => member.member)
          );
          teamsAdapter.updateOne(state, {
            id: state.teamSelected,
            changes: { acquired: newState },
          });
        }
      }
    );
  },
});

export const {
  // addTeam,
  // deleteTeam,
  addMember,
  updateTeam,
  getTeams,
  setInspect,
  toggleInspect,
  removeMember,
  updateMember,
  addFavorite,
  // setTeamSelected,
} = teamSlice.actions;

// export const teamSelectedState = (state) => state.teams.teamSelected;
export default teamSlice.reducer;
