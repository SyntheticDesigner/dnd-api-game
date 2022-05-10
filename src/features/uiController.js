import { createSlice } from "@reduxjs/toolkit";

export const uiControllerSlice = createSlice({
  name: "uiController",
  initialState: {
    srd: false,
    teamMngr: false,
    gameStart: false,
    teamSelected: 0,
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
    setTeamSelected: (state, {payload: teamId})=>{
      state.teamSelected = teamId;
    }
  },
});

export const { setSrd, toggleSrd, setTeamMngr, toggleTeamMngr, setGameStart, toggleGameStart, setTeamSelected } = uiControllerSlice.actions;

export const srdState = (state) => state.uiController.srd;
export const teamMngrState = (state) => state.uiController.teamMngr;
export const gameStartState = (state) => state.uiController.gameStart;

export default uiControllerSlice.reducer;
