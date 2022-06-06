import { createSlice } from "@reduxjs/toolkit";
import { deleteTeam, addFavorite } from "../../features/teams/makeTeamSlice";
import { startRound } from "../play/playSlice";

export const uiControllerSlice = createSlice({
  name: "uiController",
  initialState: {
    srd: false,
    teamMngr: false,
    gameStart: false,
    expandMenu: false,
    recordTbl: false,
    myTeamTbl: false,
    actionModal: false,
    tutorial: true,
  },
  reducers: {
    setSrd: (state, action) => {
      state.srd = action.payload;
      state.teamMngr = false;
      state.expandMenu = false;
      state.recordTbl = false;
      state.myTeamTbl = false;
    },
    toggleSrd: (state, action) => {
      state.srd = !state.srd;
      state.teamMngr = false;
      state.expandMenu = false;
      state.recordTbl = false;
      state.myTeamTbl = false;
    },
    setTeamMngr: (state, action) => {
      state.teamMngr = action.payload;
      state.srd = false;
      state.expandMenu = false;
      state.recordTbl = false;
      state.myTeamTbl = false;
    },
    toggleTeamMngr: (state, action) => {
      state.teamMngr = !state.teamMngr;
      state.srd = false;
      state.expandMenu = false;
      state.recordTbl = false;
      state.myTeamTbl = false;
    },
    setGameStart: (state, action) => {
      state.gameStart = action.payload;
      state.srd = false;
      state.teamMngr = false;
      state.expandMenu = false;
      state.recordTbl = false;
      state.myTeamTbl = false;
    },
    toggleGameStart: (state, action) => {
      state.gameStart = !state.gameStart;
      state.srd = false;
      state.teamMngr = false;
      state.expandMenu = false;
      state.recordTbl = false;
      state.myTeamTbl = false;
    },
    setExpandMenu: (state, action) => {
      state.expandMenu = action.payload;
      state.srd = false;
      state.teamMngr = false;
      state.recordTbl = false;
      state.myTeamTbl = false;
    },
    toggleExpandMenu: (state, action) => {
      state.expandMenu = !state.expandMenu;
      state.srd = false;
      state.teamMngr = false;
      state.recordTbl = false;
      state.myTeamTbl = false;
    },
    setRecordTbl: (state, action) => {
      state.recordTbl = action.payload;
      state.srd = false;
      state.teamMngr = false;
      state.expandMenu = false;
      state.myTeamTbl = false;
    },
    toggleRecordTbl: (state, action) => {
      state.recordTbl = !state.recordTbl;
      state.srd = false;
      state.teamMngr = false;
      state.expandMenu = false;
      state.myTeamTbl = false;
    },
    setMyTeamTbl: (state, action) => {
      state.myTeamTbl = action.payload;
      state.srd = false;
      state.teamMngr = false;
      state.expandMenu = false;
      state.recordTbl = false;
    },
    toggleMyTeamTbl: (state, action) => {
      state.myTeamTbl = !state.myTeamTbl;
      state.srd = false;
      state.teamMngr = false;
      state.expandMenu = false;
      state.recordTbl = false;
    },
    setActionModal: (state, action) => {
      state.actionModal = action.payload;
    },
    toggleActionModal: (state, action) => {
      state.actionModal = !state.actionModal;
    },
    setTutorial: (state, action) => {
      console.log(action.payload);
      state.tutorial = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteTeam, (state, { payload: teamId }) => {
      if (state.teamSelected === teamId) {
        state.teamSelected = "";
      }
      //generate a new unique id each time the actor is added to a team
    });
    builder.addCase(addFavorite, (state, { payload: { teamId, member } }) => {
      if (!teamId) {
        state.teamMngr = true;
      }
      //generate a new unique id each time the actor is added to a team
    });
    builder.addCase(
      startRound,
      (state, { payload: { prevState: playState, playerTeam } }) => {
        if (playerTeam === undefined) {
          state.teamMngr = true;
        }
      }
    );
  },
});

export const {
  setSrd,
  toggleSrd,
  setTeamMngr,
  toggleTeamMngr,
  setGameStart,
  toggleGameStart,
  toggleExpandMenu,
  setExpandMenu,
  toggleMyTeamTbl,
  setMyTeamTbl,
  toggleRecordTbl,
  setActionModal,
  toggleActionModal,
  setTutorial,
} = uiControllerSlice.actions;

export const srdState = (state) => state.uiController.srd;
export const teamMngrState = (state) => state.uiController.teamMngr;
export const gameStartState = (state) => state.uiController.gameStart;
export const expandMenuState = (state) => state.uiController.expandMenu;
export const recordTblState = (state) => state.uiController.recordTbl;
export const myTeamTblState = (state) => state.uiController.myTeamTbl;
export const actionModalState = (state) => state.uiController.actionModal;
export const tutorialState = (state) => state.uiController.tutorial;

export default uiControllerSlice.reducer;
