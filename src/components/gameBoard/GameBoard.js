import React, { useEffect, useState } from "react";
import { Board, GameBoardWrapper } from "./GameBoardStyle";
import {
  teamsSelectors,
  membersSelectors,
} from "../../features/parties/makeTeamSlice.js";
import { useSelector, useDispatch } from "react-redux";
import Actor from "./Actor";

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
    <GameBoardWrapper>
      <Board>
        {teams.map((team, teamIndex) =>
          team.members.map((member, memberIndex) => (
              <Actor
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
