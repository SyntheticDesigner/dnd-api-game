import { configureStore } from "@reduxjs/toolkit";
import makeMonsterReducer from "../features/monster/makeMonsterSlice";
import makePartyReducer from "../features/parties/makePartySlice";
import teamsReducer from "../features/parties/makeTeamSlice";
import uiControllerReducer from "../features/uiController";

export const store = configureStore({
  reducer: {
    makeMonster: makeMonsterReducer,
    makeParty: makePartyReducer,
    teams: teamsReducer,
    uiController: uiControllerReducer,
  }
});