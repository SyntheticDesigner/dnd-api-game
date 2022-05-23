import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { generateKey, rollDice } from "../../utils/utils";

export const resultsAdapter = createEntityAdapter();
export const targetsAdapter = createEntityAdapter();

export const resultsSelectors = resultsAdapter.getSelectors(
  (state) => state.action.attackResult
);
export const targetsSelectors = targetsAdapter.getSelectors(
  (state) => state.action.attackResult
);

const initialState = {
  user: {},
  action: {},
  extraBonus: 0,
  attackRoll: 0,
  damageRoll: 0,
  hit: false,
  targets: targetsAdapter.getInitialState(),
  attackResults: resultsAdapter.getInitialState(),
  startAction: false,
  endAction: false,
  actionHistory: [],
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
      state.attackResults = resultsAdapter.getInitialState();
      state.startAction = true;
      state.endAction = false;
    },
    attack: (state, action) => {
      let targets = targetsAdapter.getSelectors().selectEntities(state.targets);
      let targetIds = targetsAdapter.getSelectors().selectIds(state.targets);
      if (state.user.hp < 1) {
        alert("This Character is unconscious and can not attack right now");
      } else if (targetIds.length < 1) {
        alert("You do not have any targets");
      } else {
        state.attackRoll = rollDice(`1d20+${state.action.attack_bonus}`);
        Object.keys(targets).forEach((id, i) => {
          if (targets[id].ac < state.attackRoll) {
            // state.attackResult.push({ id: target.id, hit: true, dmg: 0 });
            resultsAdapter.addOne(state.attackResults, {
              id: id,
              hit: true,
              dmg: 0,
            });
            state.hit = true;
          } else {
            // state.attackResult.push({ id: target.id, hit: false, dmg: 0 });
            resultsAdapter.addOne(state.attackResults, {
              id: id,
              hit: false,
              dmg: 0,
            });
          }
        });
      }
    },
    rollDamage: (state, action) => {
      let currentDamage = state.damageRoll;

      state.action.damage.forEach((element) => {
        currentDamage += rollDice(element.damage_dice);
      });

      let currentResults = resultsAdapter
        .getSelectors()
        .selectEntities(state.attackResults);
      Object.keys(currentResults).forEach((id, i) => {
        if (currentResults[id].hit) {
          let target = targetsAdapter
            .getSelectors()
            .selectById(state.targets, id);
          //make a deep clone of the target
          let targetClone = JSON.parse(JSON.stringify(target));
          //subtract the damage from the hp
          targetClone.hp = targetClone.hp - currentDamage;
          targetsAdapter.updateOne(state.targets, {
            id: id,
            changes: { hp: targetClone.hp },
          });
          //update the results with the damage
          resultsAdapter.updateOne(state.attackResults, {
            id: id,
            changes: { dmg: currentDamage },
          });
        }
      });
      state.damageRoll = currentDamage;
      state.endAction = true;
    },
    npcAction: (state, { payload: { action, user, target: _target } }) => {
      let target = JSON.parse(JSON.stringify(_target));
      // console.log(action);
      // console.log(target);
      // console.log(user);
      let attackRoll = rollDice(`1d20+${action.attack_bonus}`);
      let dmgRoll = 0;
      let hit = false;
      action.damage.forEach(({ damage_dice }) => {
        dmgRoll += rollDice(damage_dice);
      });
      if (target.ac < attackRoll) {
        target.hp = target.hp - dmgRoll;
        console.log("hit");
        hit = true;
        resultsAdapter.addOne(state.attackResults, {
          id: target.id,
          hit: true,
          dmg: dmgRoll,
        });
      } else {
        resultsAdapter.addOne(state.attackResults, {
          id: target.id,
          hit: false,
          dmg: 0,
        });
      }
      state.action = action;
      state.user = user;
      //build out the entity adapter state by hand for one target
      //will need to change when implementing multi targeting system
      console.log(target);
      state.targets = { ids: [target.id], entities: { [target.id]: target } };
      state.extraBonus = 0;
      state.attackRoll = attackRoll;
      state.damageRoll = dmgRoll;
      state.hit = hit;
      state.startAction = true;
      state.endAction = true;
    },
    resetAction: (state, { payload }) => {
      state.user = {};
      state.action = {};
      state.extraBonus = 0;
      state.attackRoll = 0;
      state.damageRoll = 0;
      state.hit = false;
      state.targets = targetsAdapter.getInitialState();
      state.attackResults = resultsAdapter.getInitialState();
      state.startAction = false;
      state.endAction = false;
      state.actionHistory.push(payload);
    },
  },
});

export const { newAction, attack, rollDamage, resetAction, npcAction } =
  actionSlice.actions;
export const actionState = (state) => state.action;
export const actionHistoryState = (state) => state.action.actionHistory;

export default actionSlice.reducer;
