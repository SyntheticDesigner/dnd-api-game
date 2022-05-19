import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
  nanoid,
} from "@reduxjs/toolkit";
import { getData, rollDice } from "../../utils/utils";

export const npcTeamAdapter = createEntityAdapter();

export const membersSelectors = npcTeamAdapter.getSelectors(
  (state) => state.play.npc.npcTeam
);

export const loadMonsters = createAsyncThunk("play/loadMonsters", async () => {
  let test = await getData("/api/monsters").then((res) => {
    return res.results.map((res) => res.url);
  });
  let foo = await Promise.all(test.map((url) => getData(url)));
  return foo;
  //this will take a minute need a loading screen
  //unpacks all the different monsters available once at the start of app
});

export const playSlice = createSlice({
  name: "play",
  initialState: {
    allMonsters: [],
    npc: {
      hp: 20,
      npcTeam: npcTeamAdapter.getInitialState(),
    },
    player: {},
    round: 0,
    loading: false,
  },
  reducers: {
    startRound: (state, { payload: prevState }) => {
      let copy = JSON.parse(JSON.stringify(prevState));
      let roundNum = copy.round + 1;
      npcTeamAdapter.removeAll(state.npc.npcTeam);
      state.round = roundNum;
      let npcTeam = [];
      for (let i = 0; i < 1 + roundNum && i < 5; i++) {
        let monster =
          state.allMonsters[rollDice(`1d${state.allMonsters.length}`)];
        npcTeam.push({
          id: nanoid(),
          member: monster,
          ac: monster.armor_class,
          hp: monster.hit_points,
          actorImage: `https://5e.tools/img/MM/${monster.name
            .split(",")[0]
            .split("/")[0]
            .split("(")[0]
            .trim()}.png`,
        });
      }
      // state.ac = action.payload.armor_class;
      //   state.hp = action.payload.hit_points;
      //   state.actorImage =
      //     action.payload.name &&
      //     `https://5e.tools/img/MM/${action.payload.name
      //       .split(",")[0]
      //       .split("/")[0]
      //       .split("(")[0]
      //       .trim()}.png`;
      npcTeamAdapter.addMany(state.npc.npcTeam, npcTeam);
    },
  },
  extraReducers: {
    [loadMonsters.pending](state) {
      state.loading = true;
    },
    [loadMonsters.fulfilled](state, { payload }) {
      state.allMonsters = payload;
      state.loading = false;
    },
    [loadMonsters.rejected](state) {
      alert("Something went from with the server");
      state.loading = false;
    },
  },
});

export const { startRound } = playSlice.actions;

export const play = (state) => state.play;
export const loadingState = (state) => state.play.loading;
export const allMonsters = (state) => state.play.allMonsters;

export default playSlice.reducer;
