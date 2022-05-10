import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTeam,
  teamsSelectors,
  memberSelectors,
  addMember,
  toggleInspect,
  removeMember,
} from "../../../features/parties/makeTeamSlice";
import { MiniMngrWrap, Roster, Team } from "./MiniMngrStyles";
import { nanoid } from "@reduxjs/toolkit";

export default function MiniTeamMngr({ open }) {
  const teams = useSelector(teamsSelectors.selectEntities);
  const members = useSelector(memberSelectors.selectEntities);
  const teamIds = useSelector(teamsSelectors.selectIds);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("render");
  }, []);

  const Teams = () => {
    return (
      <>
        {Object.keys(teams).map(
          (id, i) =>
            Object.hasOwnProperty.call(teams, id) && (
              <div>
                <button onClick={() => dispatch(toggleInspect(id))}>
                  Team {i + 1} ▼
                </button>
                {/* {JSON.stringify(teams[id].members[0].memberId)} */}
                {teams[id].inspect ? (
                  teams[id].members.length > 0 ? (
                    <>
                      <button
                        onClick={() => {
                          dispatch(addMember({ teamId: id, member: {} }));
                        }}
                      >
                        Add Team Member
                      </button>
                      <ul>
                        {teams[id].members.map((member) => (
                          <li>
                            <p>{member.memberId}</p>
                            <button>delete</button>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        dispatch(addMember({ teamId: id, member: {} }));
                      }}
                    >
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
