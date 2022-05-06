import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addParty,
  clearParty,
  partySelectors,
  addId,
  partyId,
  deletePartyMember,
} from "../../../features/parties/makePartySlice";
import {
  addTeam,
  teamsSelectors,
  updateTeam,
} from "../../../features/parties/makeTeamSlice";
import { MiniMngrWrap, Roster, Team } from "./MiniMngrStyles";
import { nanoid } from "@reduxjs/toolkit";

export default function MiniTeamMngr({ open }) {
  const partyEnt = useSelector(partySelectors.selectEntities);
  const partyTotal = useSelector(partySelectors.selectTotal);
  const teamsEnt = useSelector(teamsSelectors.selectEntities);
  const _partyId = useSelector(partyId);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("render");
    dispatch(updateTeam({ id: _partyId, changes: { team: partyEnt } }));
  }, [_partyId, dispatch, partyEnt]);

  const teams = [];
  Object.keys(teamsEnt).map(
    (id, i) =>
      Object.hasOwnProperty.call(teamsEnt, id) && teams.push(teamsEnt[id])
  );
  const party = [];
  Object.keys(partyEnt).map(
    (id, i) =>
      Object.hasOwnProperty.call(partyEnt, id) && party.push(partyEnt[id])
  );

  return (
    <MiniMngrWrap open={open}>
      <button
        onClick={() => {
          // dispatch(makeTeam(party));
          dispatch(addTeam({ id: nanoid(), team: party }));
          dispatch(clearParty());
          dispatch(addId(""));
        }}
      >
        New Team
      </button>
      {/* <p>Current Party Members {party.length}</p> */}
      <p>Teams</p>
      {teams.length > 0 &&
        teams.map((_team, i) => (
          <Team key={i}>
            <button
              onClick={() => {
                if (_team.id === _partyId) {
                  dispatch(clearParty());
                  dispatch(addId(""));
                } else {
                  dispatch(addParty(_team.team));
                  dispatch(addId(_team.id));
                }
              }}
            >
              Team {i + 1} Members: {Object.keys(_team.team).length}
            </button>{" "}
          </Team>
        ))}
      {partyTotal > 0 && (
        <>
          <h2>
            Id <br />
            {_partyId}
          </h2>
          <ul>
            {party.map(({ id, member }, i) => (
              <li key={i}>
                <p>{member.name}</p>
                <p>{id}</p>
                <button
                  onClick={() => {
                    dispatch(deletePartyMember(id));
                    console.log(partyEnt);
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </MiniMngrWrap>
  );
}
