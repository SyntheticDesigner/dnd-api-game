import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
//import state
import {
  addPlayer,
  deletePlayer,
  playersSelectors,
  addSelectedPlayer,
  removeSelectedPlayer,
  playersSelectedState,
} from "../../../../features/play/playSlice";

import { setTeamMngr } from "../../../../features/ui/uiControlSlice";
//import styles
import { MiniMngrWrap, Roster, Team } from "./TeamsStyles";
import CloseBtn from "../../setPieces/CloseBtn";

export default function TeamsMngr() {
  //Team Slice Selectors
  const players = useSelector(playersSelectors.selectEntities);
  const playerIds = useSelector(playersSelectors.selectIds);

  //UI selectors
  const currentPlayers = useSelector(playersSelectedState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Independent state for the name input field
  const [teamName, setTeamName] = useState("");

  const handleDeselect = (id) => {
    //see if the player is already selected
    if (currentPlayers.filter((playerId) => playerId === id).length > 0) {
      dispatch(removeSelectedPlayer(id));
    } else {
      dispatch(addSelectedPlayer(id));
    }
  };

  const Teams = () => {
    return (
      <div className="team-list">
        {Object.keys(players).map(
          (id, i) =>
            Object.hasOwnProperty.call(players, id) && (
              <Team
                key={nanoid()}
                selected={
                  currentPlayers.filter((playerId) => playerId === id).length >
                  0
                }
              >
                <button>{players[id].name}</button>
                <button onClick={() => handleDeselect(id)}>
                  {currentPlayers.filter((playerId) => playerId === id).length >
                  0
                    ? `Deselect`
                    : `Select`}
                </button>
                <button onClick={() => dispatch(deletePlayer(id))}>
                  Delete
                </button>
                {players[id].inspect ? (
                  players[id].members.length > 0 ? (
                    <>
                      <ul>
                        <p>Favorites</p>
                        {players[id].members.map(({ memberId, member }) => (
                          <li key={memberId}>
                            <p>{member.actorObject.name}</p>
                            <button>delete</button>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
              </Team>
            )
        )}
      </div>
    );
  };

  function handleAdd() {
    if (teamName.length) {
      let _id = teamName.replace(/\s+/g, "");
      let idDetector = playerIds.filter((id) => id === _id);
      if (idDetector.length) {
        console.log("test");
        alert("Someone already has this name try another");
      } else {
        dispatch(addPlayer({ id: _id, name: teamName }));
        dispatch(addSelectedPlayer(_id));
        setTeamName("");
      }
    } else {
      let _id = nanoid();
      dispatch(addPlayer({ id: _id, name: _id }));
      dispatch(addSelectedPlayer(_id));
    }
  }
  return (
    <MiniMngrWrap>
      <h1>Select Your Player</h1>
      <CloseBtn
        className='teamMng-close'
        click={() => dispatch(setTeamMngr(false))}
      />
      <div className='name-input-wrapper'>
        <input
          onChange={(e) => setTeamName(e.target.value)}
          value={teamName}
          type='text'
          placeholder='Add Player Name'
        />
      </div>
      <button onClick={handleAdd}>Create Player</button>
      <Teams />
    </MiniMngrWrap>
  );
}
