import { configureStore } from "@reduxjs/toolkit";
import makeActorReducer from "../features/monster/makeActorSlice";
import teamsReducer from "../features/parties/makeTeamSlice";
import uiControllerReducer from "../features/uiController";

export const store = configureStore({
  reducer: {
    makeActor: makeActorReducer,
    teams: teamsReducer,
    uiController: uiControllerReducer,
  }
});