import { createSlice } from "@reduxjs/toolkit";
import { deleteTeam } from "../../features/teams/makeTeamSlice";

export const uiControllerSlice = createSlice({
  name: "uiController",
  initialState: {
    srd: false,
    teamMngr: false,
    gameStart: false,
    teamSelected: "",
    expandMenu: false,
    recordTbl: false,
    myTeamTbl: false,
  },
  reducers: {
    setSrd: (state, action) => {
      state.srd = action.payload;
    },
    toggleSrd: (state, action) => {
      state.srd = !state.srd;
    },
    setTeamMngr: (state, action) => {
      state.teamMngr = action.payload;
    },
    toggleTeamMngr: (state, action) => {
      state.teamMngr = !state.teamMngr;
    },
    setGameStart: (state, action) => {
      state.GameStart = action.payload;
    },
    toggleGameStart: (state, action) => {
      state.gameStart = !state.gameStart;
    },
    setTeamSelected: (state, { payload: teamId }) => {
      state.teamSelected = teamId;
    },
    setExpandedMenu: (state, action) => {
      state.expandedMenu = action.payload;
    },
    toggleExpandedMenu: (state, action) => {
      state.expandedMenu = !state.expandedMenu;
    },
    setRecordTbl: (state, action) => {
      state.recordTbl = action.payload;
    },
    toggleRecordTbl: (state, action) => {
      state.recordTbl = !state.recordTbl;
    },
    setMyTeamTbl: (state, action) => {
      state.myTeamTbl = action.payload;
    },
    toggleMyTeamTbl: (state, action) => {
      state.myTeamTbl = !state.myTeamTbl;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteTeam, (state, { payload: teamId }) => {
      if (state.teamSelected === teamId) {
        state.teamSelected = "";
      }
      //generate a new unique id each time the actor is added to a team
    });
  },
});

export const {
  setSrd,
  toggleSrd,
  setTeamMngr,
  toggleTeamMngr,
  setGameStart,
  toggleGameStart,
  setTeamSelected,
  toggleExpandedMenu,
  setExpandedMenu,
  toggleMyTeamTbl,
  setMyTeamTbl,
  toggleRecordTbl,
} = uiControllerSlice.actions;

export const srdState = (state) => state.uiController.srd;
export const teamMngrState = (state) => state.uiController.teamMngr;
export const gameStartState = (state) => state.uiController.gameStart;
export const expandedMenuState = (state) => state.uiController.expandedMenu;
export const recordTblState = (state) => state.uiController.recordTbl;
export const myTeamTblState = (state) => state.uiController.myTeamTbl;
export const teamSelected = (state) => state.uiController.teamSelected;

export default uiControllerSlice.reducer;
