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
  addMember
} from "../../../features/parties/makeTeamSlice";
import { MiniMngrWrap, Roster, Team } from "./MiniMngrStyles";
import { nanoid } from "@reduxjs/toolkit";

export default function MiniTeamMngr({ open }) {
  const partyEnt = useSelector(partySelectors.selectEntities);
  const partyTotal = useSelector(partySelectors.selectTotal);
  const teamsEnt = useSelector(teamsSelectors.selectEntities);
  const teamIds = useSelector(teamsSelectors.selectIds);
  const _partyId = useSelector(partyId);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("render");
    dispatch(updateTeam({ id: _partyId, changes: { team: partyEnt } }));
  }, [_partyId, dispatch, partyEnt]);

  const teams = [];
  // Object.keys(teamsEnt).map(
  //   (id, i) =>
  //     Object.hasOwnProperty.call(teamsEnt, id) && teams.push(teamsEnt[id])
  // );
  const party = [];
  // Object.keys(partyEnt).map(
  //   (id, i) =>
  //     Object.hasOwnProperty.call(partyEnt, id) && party.push(partyEnt[id])
  // );

  return (
    <MiniMngrWrap open={open}>
      <button
        onClick={() => {
          dispatch(addTeam({id: nanoid(), memberIds: []}));
        }}
      >
        New Team
      </button>
      <button
        onClick={() => {
          dispatch(addMember({teamId: teamIds[0], member: {}}));
        }}
      >
        {/* need to generate these dynamically for every team */}
        New Member{teamIds[0]}
      </button>
      {/* <p>Current Party Members {party.length}</p> */}
      <p>Teams</p>
      {teams.length > 0 &&
        teams.map((_team, i) => (
          <Team key={i} selected={_team.id === _partyId ? true : false}>
            <strong>
              {/* Team {i + 1} Members: {Object.keys(_team.team).length} */}
            </strong>
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
              Edit
            </button>{" "}
          </Team>
        ))}
      {_partyId && (
        <h3>
          Id <br />
          {_partyId}
        </h3>
      )}
      {partyTotal > 0 && (
        <>
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
