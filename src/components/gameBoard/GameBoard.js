import React, { useEffect, useState } from "react";
import { Board, GameBoardWrapper, Map } from "./GameBoardStyle";
import {
  teamsSelectors,
  membersSelectors,
  teamSelectedState,
} from "../../features/teams/makeTeamSlice.js";
import {
  npcTeamSelectors,
  playerTurnState,
} from "../../features/play/playSlice";
import {
  npcAction,
  actionState,
  resetAction,
} from "../../features/action/actionSlice";
import { useSelector, useDispatch } from "react-redux";
import Actor from "../actor/Actor";
import { randomNumber } from "../../utils/utils";

export default function GameBoard() {
  const teamEnts = useSelector(teamsSelectors.selectEntities);
  const teamSelected = useSelector(teamSelectedState);
  const npcTeamEnts = useSelector(npcTeamSelectors.selectEntities);
  const npcTeamIds = useSelector(npcTeamSelectors.selectIds);
  const playerTurn = useSelector(playerTurnState);
  const actionStateInfo = useSelector(actionState);
  const members = useSelector(membersSelectors.selectEntities);

  const playerTeam = teamEnts[teamSelected];

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !playerTurn &&
      actionStateInfo.endAction &&
      actionStateInfo.startAction
    ) {
      console.log(actionStateInfo);
      dispatch(resetAction(actionStateInfo));
    }
  }, [actionStateInfo]);
  //attempt at NPC Automation
  useEffect(() => {
    //if it is no longer the players turn
    if (!playerTurn) {
      console.log("run AI");
      npcTeamIds.forEach((npcId) => {
        //for each enemy
        //get actions that are normal attacks by filtering only those that have attack bonus and simple dmg array
        //currently these are the only actions we can execute
        let actions = npcTeamEnts[npcId].actorObject.actions.filter(
          (action) => action.attack_bonus && action.damage
        );
        //choose a random action
        let action;
        if (actions.length === 1) {
          action = actions[0];
        } else if (actions.length > 1) {
          action = actions[randomNumber(0, actions.length - 1)];
        }
        //choose a random LIVING target
        let team = teamEnts[teamSelected].members.filter(
          ({ member }) => member.hp > 0
        );
        let targetId;
        if (team.length < 1) {
          alert("alert no one to target");
        } else {
          //if team more than one get random else get only one
          targetId =
            team.length > 1
              ? team[randomNumber(0, team.length - 1)].member.id
              : team[0].member.id;
        }

        setTimeout(() => {
          console.log(members[targetId]);
          dispatch(
            npcAction({
              action,
              user: npcTeamEnts[npcId],
              target: members[targetId].member,
            })
          );
        }, 500);
      });
    }
  }, [playerTurn]);

  return (
    <GameBoardWrapper id='gameBoardPos'>
      <Board>
        {playerTeam &&
          playerTeam.members &&
          playerTeam.members.length > 0 &&
          playerTeam.members.map((member, memberIndex) => (
            <Actor
              key={memberIndex}
              actor={member.member}
              memberIndex={memberIndex}
              teamIndex={0}
            />
          ))}
        {npcTeamIds &&
          npcTeamIds.length > 0 &&
          npcTeamIds.map((id, i) => (
            <Actor
              key={id}
              actor={npcTeamEnts[id]}
              memberIndex={i}
              teamIndex={1}
            />
          ))}
      </Board>
    </GameBoardWrapper>
  );
}
