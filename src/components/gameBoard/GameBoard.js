import React, { useEffect, useState } from "react";
import { Board, GameBoardWrapper, Map } from "./GameBoardStyle";
import {
  teamsSelectors,
  membersSelectors,
} from "../../features/teams/makeTeamSlice.js";
import { useSelector, useDispatch } from "react-redux";
import Actor from "../actor/Actor";

export default function GameBoard() {
  const packedTeams = useSelector(teamsSelectors.selectEntities);
  const packedMembers = useSelector(membersSelectors.selectEntities);
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const unpackMembers = () =>
      Object.keys(packedMembers).map(
        (id, i) =>
          Object.hasOwnProperty.call(packedMembers, id) && packedMembers[id]
      );
    setMembers(unpackMembers());
    const unpackTeams = () =>
      Object.keys(packedTeams).map(
        (id, i) =>
          Object.hasOwnProperty.call(packedTeams, id) && packedTeams[id]
      );
    setTeams(unpackTeams());
  }, [packedTeams, packedMembers]);

  return (
    <GameBoardWrapper id="gameBoardPos">
        <Board>
          {teams.map((team, teamIndex) =>
            team.members.map((member, memberIndex) => (
              <Actor
                key={memberIndex}
                actor={member}
                memberIndex={memberIndex}
                teamIndex={teamIndex}
              />
            ))
          )}
        </Board>
    </GameBoardWrapper>
  );
}
