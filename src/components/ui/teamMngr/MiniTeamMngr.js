import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setParty,
  partyMembers,
} from "../../../features/parties/makePartySlice";
import { teamRoster, makeTeam } from "../../../features/parties/makeTeamSlice";
import { MiniMngrWrap, Roster, Team } from "./MiniMngrStyles";

export default function MiniTeamMngr() {
  const party = useSelector(partyMembers);
  const teams = useSelector(teamRoster);
  const dispatch = useDispatch();
  return (
    <MiniMngrWrap>
      <p>Current Party Members {party.length}</p>
      <button
        onClick={() => {
          dispatch(makeTeam(party));
          dispatch(setParty([]));
        }}
      >
        create team
      </button>
      <p>Teams {teams.length}</p>
      {teams.length > 0 &&
        teams.map((team, i) => (
          <Team key={i}>
            <button>
              Team{i + 1} {team.teamMembers.length}
            </button>{" "}
            {team.teamMembers.length > 0 && (
              <ul>
                {team.teamMembers.map((member, i) => (
                  <li key={i}>
                    <p>{member.name}</p>
                  </li>
                ))}
              </ul>
            )}
          </Team>
        ))}
    </MiniMngrWrap>
  );
}
