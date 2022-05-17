import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
//import state
import {
  addTeam,
  teamsSelectors,
  membersSelectors,
  toggleInspect,
  removeMember,
  deleteTeam,
} from "../../../../features/teams/makeTeamSlice";
import {
  setTeamSelected,
  teamSelected,
} from "../../../../features/ui/uiControlSlice";
//import styles
import { MiniMngrWrap, Roster, Team } from "./TeamsStyles";

export default function TeamsMngr() {
  //Team Slice Selectors
  const teams = useSelector(teamsSelectors.selectEntities);
  const teamIds = useSelector(teamsSelectors.selectIds);
  const members = useSelector(membersSelectors.selectEntities);

  //UI selectors
  const currentTeam = useSelector(teamSelected);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Independent state for the name input field
  const [teamName, setTeamName] = useState("");

  const Teams = () => {
    return (
      <>
        {Object.keys(teams).map(
          (id, i) =>
            Object.hasOwnProperty.call(teams, id) && (
              <Team key={nanoid()} selected={currentTeam === id}>
                <div>
                  <button onClick={() => dispatch(toggleInspect(id))}>
                    {teams[id].name}
                  </button>
                  <button onClick={() => dispatch(setTeamSelected(id))}>
                    select
                  </button>
                  <button onClick={() => dispatch(deleteTeam(id))}>
                    delete
                  </button>
                </div>
                {teams[id].inspect ? (
                  teams[id].members.length > 0 ? (
                    <>
                      {/* <button
                        // onClick={() => {
                        //   dispatch(addMember({ teamId: id, member: {} }));
                        // }}
                        onClick={() => navigate(`/monsters/${id}`)}
                      >
                        Add Team Member
                      </button> */}
                      <ul>
                        <p>Favorites</p>
                        {teams[id].members.map(({ memberId, member }) => (
                          <li key={memberId}>
                            <p>{member.actorObject.name}</p>
                            <button
                              onClick={() => dispatch(removeMember(memberId))}
                            >
                              delete
                            </button>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <></>
                    // <button onClick={() => navigate(`/monsters/${id}`)}>
                    //   Add Team Member
                    // </button>
                  )
                ) : (
                  <></>
                )}
              </Team>
            )
        )}
      </>
    );
  };

  function handleAdd() {
    if (teamName.length) {
      let _id = teamName.replace(/\s+/g, "");
      let idDetector = teamIds.filter((id) => id === _id);
      if (idDetector.length) {
        console.log("test");
        alert("Someone already has this name try another");
      } else {
        dispatch(addTeam({ id: _id, name: teamName }));
        dispatch(setTeamSelected(_id));
        setTeamName("");
      }
    } else {
      let _id = nanoid();
      dispatch(addTeam({ id: _id, name: _id, members: [] }));
      dispatch(setTeamSelected(_id));
    }
  }
  return (
    <MiniMngrWrap>
      <input
        onChange={(e) => setTeamName(e.target.value)}
        value={teamName}
        type='text'
      />
      <button onClick={handleAdd}>Create Your Team</button>
      <Teams />
    </MiniMngrWrap>
  );
}
