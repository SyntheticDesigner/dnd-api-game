import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
  nanoid,
} from "@reduxjs/toolkit";
import { getData, rollDice } from "../../utils/utils";
import { resetAction } from "../action/actionSlice";

//loads all the monster we will need for the game should not need to call fetch anywhere else
export const loadMonsters = createAsyncThunk("play/loadMonsters", async () => {
  let test = await getData("/api/monsters").then((res) => {
    return res.results.map((res) => res.url);
  });
  let foo = await Promise.all(test.map((url) => getData(url)));
  return foo;
  //this will take a few seconds need a loading screen
  //unpacks all the different monsters available once at the start of app
});
//create a list of items for the Monsters
export const monsterListAdapter = createEntityAdapter({
  selectId: (monster) => monster.index,
});
//create selectors for the monster list
export const monsterListSelectors = monsterListAdapter.getSelectors(
  (state) => state.play.allMonsters
);

//create the NPC state
export const npcTeamAdapter = createEntityAdapter();
export const npcTeamSelectors = npcTeamAdapter.getSelectors(
  (state) => state.play.npc.team
);
const initialNpcState = {
  id: "npcTeam",
  hp: 20,
  team: npcTeamAdapter.getInitialState(),
};

//create player state
export const playersAdapter = createEntityAdapter();
export const playersSelectors = playersAdapter.getSelectors(
  (state) => state.play.players
);
export const teamMembersAdapter = createEntityAdapter();
export const acquiredAdapter = createEntityAdapter({
  selectId: (member) => member.actorObject.index,
  sortComparer: (a, b) =>
    a.actorObject.index.localeCompare(b.actorObject.index),
});
const initialPlayersState = playersAdapter.getInitialState();

const initialState = {
  allMonsters: monsterListAdapter.getInitialState(),
  npc: initialNpcState,
  players: initialPlayersState,
  round: 0,
  loading: false,
  loaded: false,
  currentPlayersTurn: "",
  roundStart: false,
  roundEnd: false,
  playersSelected: [],
};

export const playSlice = createSlice({
  name: "play",
  initialState,
  reducers: {
    addPlayer: (state, { payload: { id, name } }) => {
      console.log(id, name);
      playersAdapter.addOne(state.players, {
        id: id ? id : nanoid(),
        name: name,
        team: teamMembersAdapter.getInitialState(),
        //initialized as a dynamic entity adapter in the addPlayer reducer
        acquiredMonsters: acquiredAdapter.getInitialState(),
        //initialized as a dynamic entity adapter in the addPlayer reducer
        health: 20,
      });
    },
    deletePlayer: (state, { payload: playerId }) => {
      playersAdapter.removeOne(state.players, playerId);
    },
    addSelectedPlayer: (state, { payload: teamId }) => {
      let copy = JSON.parse(JSON.stringify(state.playersSelected));
      copy.push(teamId);
      state.playersSelected = copy;
    },
    removeSelectedPlayer: (state, { payload: playerId }) => {
      let copy = JSON.parse(JSON.stringify(state.playersSelected));
      let newCopy = copy.filter((id) => id !== playerId);
      state.playersSelected = newCopy;
    },
    startRound: (state, { payload: { prevState, playerTeam } }) => {
      state.roundStart = true;
      state.playerTurn = true;
      if (playerTeam === undefined) {
        alert("You must first make a team");
      } else {
        // make a deep copy
        let copy = JSON.parse(JSON.stringify(prevState));
        //increment the round
        let roundNum = copy.round + 1;
        state.round = roundNum;
        //erase previous npc team
        if (
          npcTeamAdapter.getSelectors().selectIds(state.npc.team).length > 0
        ) {
          npcTeamAdapter.removeAll(state.npc.team);
        }
        //create a new RANDOM npc team
        //currently true random could use to be a little more
        //guided and progressive based on cr rating
        let npcTeam = [];
        let monsterIds = monsterListAdapter
          .getSelectors()
          .selectIds(state.allMonsters);
        let monsterEntities = monsterListAdapter
          .getSelectors()
          .selectEntities(state.allMonsters);
        for (let i = 0; i < 1; i++) {
          let monsterId = monsterIds[rollDice(`1d${monsterIds.length}`)];
          let monster = monsterEntities[monsterId];
          npcTeam.push({
            id: nanoid(),
            teamId: "npcTeam",
            actorObject: monster,
            ac: monster.armor_class,
            hp: monster.hit_points,
            actorImage: `https://5e.tools/img/MM/${monster.name
              .split(",")[0]
              .split("/")[0]
              .split("(")[0]
              .trim()}.png`,
            targetedBy: "",
            targeting: {},
            targetMode: false,
            actorPos: { x: 0, y: 0 },
          });
        }
        //upload the new npc team to the npcTeam entity
        npcTeamAdapter.addMany(state.npc.team, npcTeam);
      }
    },
    endTurn: (state, { payload }) => {
      state.playerTurn = false;
      console.log("end Turn");
    },
  },
  extraReducers: {
    [loadMonsters.pending](state) {
      state.loading = true;
    },
    [loadMonsters.fulfilled](state, { payload }) {
      // state.allMonsters = payload;
      monsterListAdapter.addMany(state.allMonsters, payload);
      state.loading = false;
      state.loaded = true;
    },
    [loadMonsters.rejected](state) {
      alert("Something went from with the server");
      state.loading = false;
    },
    [resetAction](state, { payload: actionState }) {
      const targetEntities = actionState.targets.entities;
      const targetIds = actionState.targets.ids;
      let npcTeamIds = npcTeamAdapter.getSelectors().selectIds(state.npc.team);
      let lastNpc = npcTeamIds[npcTeamIds.length - 1];
      console.log(actionState.user.id);
      console.log(lastNpc);
      targetIds.forEach((id) => {
        if (targetEntities[id].teamId === "npcTeam") {
          //update monster to new monster changed by action
          npcTeamAdapter.updateOne(state.npc.team, {
            id: id,
            changes: targetEntities[id],
          });
        }
      });
      if (lastNpc === actionState.user.id) {
        console.log("players Turn");
        state.playerTurn = true;
      }
    },
  },
});

export const {
  startRound,
  endTurn,
  addPlayer,
  deletePlayer,
  addSelectedPlayer,
  removeSelectedPlayer,
} = playSlice.actions;

export const play = (state) => state.play;
export const loadingState = (state) => state.play.loading;
export const allMonsters = (state) => state.play.allMonsters;
export const playerTurnState = (state) => state.play.playerTurn;
export const loadedState = (state) => state.play.loaded;
export const playersSelectedState = (state) => state.play.playersSelected;

export default playSlice.reducer;
