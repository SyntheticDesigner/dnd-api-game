import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTeam,
  teamsSelectors,
  membersSelectors,
  toggleInspect,
  removeMember,
  deleteTeam
} from "../../../features/teams/makeTeamSlice";
import { MiniMngrWrap, Roster, Team } from "./MiniMngrStyles";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

export default function MiniTeamMngr({ open }) {
  const teams = useSelector(teamsSelectors.selectEntities);
  const members = useSelector(membersSelectors.selectEntities);
  const teamIds = useSelector(teamsSelectors.selectIds);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("render");
  }, []);

  const Teams = () => {
    return (
      <>
        {Object.keys(teams).map(
          (id, i) =>
            Object.hasOwnProperty.call(teams, id) && (
              <div key={nanoid()}>
                <div>
                  <button onClick={() => dispatch(toggleInspect(id))}>
                    Team {i + 1} {teams[id].inspect ? "▲" : "▼"}
                  </button>
                  <button onClick={() => dispatch(deleteTeam(id))}>delete team</button>
                </div>
                {teams[id].inspect ? (
                  teams[id].members.length > 0 ? (
                    <>
                      <button
                        // onClick={() => {
                        //   dispatch(addMember({ teamId: id, member: {} }));
                        // }}
                        onClick={() => navigate(`/monsters/${id}`)}
                      >
                        Add Team Member
                      </button>
                      <ul>
                        {teams[id].members.map(({memberId, member}) => (
                          <li key={memberId}>
                            <p>{member.actorObject.name}</p>
                            <button
                              onClick={() =>
                                dispatch(removeMember(memberId))
                              }
                            >
                              delete
                            </button>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <button onClick={() => navigate(`/monsters/${id}`)}>
                      Add Team Member
                    </button>
                  )
                ) : (
                  <></>
                )}
              </div>
            )
        )}
      </>
    );
  };

  return (
    <MiniMngrWrap open={open}>
      <button
        onClick={() => {
          dispatch(addTeam({ id: nanoid(), members: [] }));
        }}
      >
        New Team
      </button>
      <p>Teams</p>
      <Teams />
    </MiniMngrWrap>
  );
}
