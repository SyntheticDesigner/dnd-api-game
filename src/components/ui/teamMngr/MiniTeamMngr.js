import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setParty,
  partyMembers,
  deletePartyMember
} from "../../../features/parties/makePartySlice";
import {
  teamRoster,
  makeTeam,
  selectTeam,
  selectedTeam,
} from "../../../features/parties/makeTeamSlice";
import { MiniMngrWrap, Roster, Team } from "./MiniMngrStyles";

export default function MiniTeamMngr({ open }) {
  const party = useSelector(partyMembers);
  const teams = useSelector(teamRoster);
  const editingTeam = useSelector(selectedTeam);
  const dispatch = useDispatch();
  return (
    <MiniMngrWrap open={open}>
      <button
        onClick={() => {
          dispatch(makeTeam(party));
          dispatch(setParty([]));
        }}
      >
        New Team
      </button>
      <p>Current Party Members {party.length}</p>
      <p>Teams {teams.length}</p>
      {teams.length > 0 &&
        teams.map((team, i) => (
          <Team key={i}>
            <button onClick={() => dispatch(selectTeam(team.teamId))}>
              Team {i + 1} {team.teamMembers.length}
            </button>{" "}
          </Team>
        ))}
      {editingTeam &&
      editingTeam.teamMembers &&
      editingTeam.teamMembers.length > 0 ? (
        <>
          <h2>Editing</h2>
          <h3>{editingTeam.teamId}</h3>
          <ul>
            {editingTeam.teamMembers.map((member, i) => (
              <li key={i}>
                {/* {JSON.stringify(member.info)} */}
                <p>{member.info.name}</p>
                <p>{member.memberId}</p>
                <button onClick={()=>dispatch(deletePartyMember([editingTeam, member.memberId]))}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <></>
      )}
    </MiniMngrWrap>
  );
}
