import { configureStore } from "@reduxjs/toolkit";
import makeMonsterReducer from "../features/monster/makeMonsterSlice";
import makePartyReducer from "../features/parties/makePartySlice";
import makeTeamsReducer from "../features/parties/makeTeamSlice";

export const store = configureStore({
  reducer: {
    makeMonster: makeMonsterReducer,
    makeParty: makePartyReducer,
    makeTeams: makeTeamsReducer,
  }
});