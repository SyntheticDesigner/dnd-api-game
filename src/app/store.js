import { configureStore } from "@reduxjs/toolkit";
import makeActorReducer from "../features/actor/makeActorSlice";
import teamsReducer from "../features/teams/makeTeamSlice";
import uiControllerReducer from "../features/uiController";
import actionReducer from "../features/battle/actionSlice";

export const store = configureStore({
  reducer: {
    makeActor: makeActorReducer,
    teams: teamsReducer,
    uiController: uiControllerReducer,
    action: actionReducer,
  }
});