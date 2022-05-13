import { createSlice } from "@reduxjs/toolkit";
import { generateKey, rollDice } from "../../utils/utils";

const initialState = {
  user: {},
  targets: [],
  action: {},
  extraBonus: 0,
  attackRoll: 0,
  damageRoll: 0,
  hit: false,
  attackResult: [],
};

const actionSlice = createSlice({
  name: "action",
  initialState,
  reducers: {
    newAction: (state, { payload: { action, actor } }) => {
      state.action = action;
      state.user = actor;
      state.targets = actor.targeting;
      state.extraBonus = 0;
      state.attackRoll = 0;
      state.damageRoll = 0;
      state.hit = false;
      state.attackResult = [];

      if (action.attack_bonus >= 0) {
        console.log("attack");
      } else {
        console.log("maybe attack");
      }
    },
    attack: (state, action) => {
      console.log(action);
      state.attackRoll = rollDice(`1d20+${state.action.attack_bonus}`);
      if (state.targets.length < 1) {
        alert("You do not have any targets");
      } else {
        state.targets.forEach((target) => {
          if (target.ac < state.attackRoll) {
            console.log(state.attackRoll);
            state.attackResult.push({ id: target.id, hit: true });
            state.hit = true;
          } else {
            console.log("miss");
            state.attackResult.push({ id: target.id, hit: false });
          }
        });
      }
    },
    rollDamage: (state, action) => {
      console.log(action);
      let currentDamage = state.damageRoll;
      state.action.damage.forEach(element => {
        currentDamage += rollDice(element.damage_dice)
      });

      state.damageRoll = currentDamage;
    },
  },
});

export const { newAction, attack, rollDamage } = actionSlice.actions;
export const actionState = (state) => state.action;

export default actionSlice.reducer;
