import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addParty,
  clearParty,
  partySelectors,
  addId,
  partyId
} from "../../../features/parties/makePartySlice";
import {
  teamRoster,
  makeTeam,
  selectTeam,
  selectedTeam,
  addTeam,
  teamsSelectors,
} from "../../../features/parties/makeTeamSlice";
import { MiniMngrWrap, Roster, Team } from "./MiniMngrStyles";
import { nanoid } from "@reduxjs/toolkit";

export default function MiniTeamMngr({ open }) {
  const partyEnt = useSelector(partySelectors.selectAll);
  const partyTotal = useSelector(partySelectors.selectTotal);
  const teamsEnt = useSelector(teamsSelectors.selectEntities);
  const _partyId = useSelector(partyId);
  const dispatch = useDispatch();

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
      {/* {JSON.stringify(teams)} */}
      <button
        onClick={() => {
          // dispatch(makeTeam(party));
          dispatch(addTeam({ id: nanoid(), team: party }));
          dispatch(clearParty());
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
                dispatch(addParty(_team.team));
                dispatch(addId(_team.id));
              }}
            >
              Team {i + 1} Members: {_team.team.length}
            </button>{" "}
          </Team>
        ))}
      {partyTotal > 0 && (
        <>{JSON.stringify(partyEnt)}
          <h2>Id <br/>{_partyId}</h2>
          {/* <h3>{editingTeam.teamId}</h3>
          <ul>
            {editingTeam.teamMembers.map((member, i) => (
              <li key={i}>
                <p>{member.info.name}</p>
                <p>{member.memberId}</p>
                <button onClick={()=>dispatch(deletePartyMember([editingTeam, member.memberId]))}>Delete</button>
              </li>
            ))}
          </ul> */}
        </>
      ) }
    </MiniMngrWrap>
  );
}
