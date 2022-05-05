import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setParty,
  partyMembers,
} from "../../../features/parties/makePartySlice";
import { teamRoster, makeTeam } from "../../../features/parties/makeTeamSlice";
import { MiniMngrWrap, Roster, Team } from "./MiniMngrStyles";

export default function MiniTeamMngr({ open }) {
  const party = useSelector(partyMembers);
  const teams = useSelector(teamRoster);
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
