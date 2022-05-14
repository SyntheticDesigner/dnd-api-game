import { configureStore } from "@reduxjs/toolkit";
import makeActorReducer from "../features/actor/makeActorSlice";
import teamsReducer from "../features/teams/makeTeamSlice";
import uiControllerReducer from "../features/ui/uiControlSlice";
import actionReducer from "../features/action/actionSlice";

export const store = configureStore({
  reducer: {
    makeActor: makeActorReducer,
    teams: teamsReducer,
    uiController: uiControllerReducer,
    action: actionReducer,
  }
});