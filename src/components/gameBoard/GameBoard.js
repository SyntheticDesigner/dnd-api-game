import React, { useEffect, useState } from "react";
import { Board, GameBoardWrapper } from "./GameBoardStyle";
import {
  addTeam,
  getTeams,
  teamsSelectors,
  updateTeam,
} from "../../features/parties/makeTeamSlice.js";
import { useSelector, useDispatch } from "react-redux";

export default function GameBoard() {
  const teamEntities = useSelector(teamsSelectors.selectEntities);
  const [roster, setRoster] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const _roster = [];
    Object.keys(teamEntities).map(
      (id, i) =>
        Object.hasOwnProperty.call(teamEntities, id) &&
        _roster.push(teamEntities[id])
    );
    setRoster(_roster);
    console.log(roster);
  }, [teamEntities]);

  return (
    <GameBoardWrapper>
      <button>Click me</button>
      <Board>
        {/* {roster &&
          roster.length > 0 &&
          roster.map((team) => Object.keys(team).map((id, i)=> Object.keys(team.team).map((_id, _i)=>console.log(team.team[_id].member))))} */}
      </Board>
    </GameBoardWrapper>
  );
}
