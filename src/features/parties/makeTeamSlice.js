import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { generateKey } from "../../utils/utils";
export const makeTeamSlice = createSlice({
  name: "makeTeams",
  initialState: {
    teams: [],
  },
  reducers: {
    makeTeam: (state, action) => {
      let _teamId = generateKey(`team${state.teams.length + 1}`);
      let _team = {
        teamMembers: action.payload,
        teamId: _teamId
      }
       state.teams.push(_team);
    },
  },
});

export const { makeTeam } = makeTeamSlice.actions;

export const teamRoster = (state) => state.makeTeams.teams;

export default makeTeamSlice.reducer;
