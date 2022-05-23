import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import {
  LifeCountWrap,
  NavGrid,
  NavWrap,
  ManageBtnWrap,
} from "./MasterNavStyle";
import heartFrame from "../../../assets/icons/heart-frame.png";
import close from "../../../assets/icons/close-x.svg";

import { startRound, play, endTurn } from "../../../features/play/playSlice";
import {
  teamSelectedState,
  teamsSelectors,
} from "../../../features/teams/makeTeamSlice";

import Menu from "./menu/Menu";
import Records from "./records/Records";
import Manage from "./manage/Manage";

export default function MasterNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const playState = useSelector(play);
  const playerTeams = useSelector(teamsSelectors.selectEntities);
  const teamSelected = useSelector(teamSelectedState);

  const LifeCounter = () => {
    return (
      <LifeCountWrap>
        <div className='imgWrap'>
          <img id='heartIcon' src={heartFrame} alt='not loading' />
        </div>
      </LifeCountWrap>
    );
  };

  return (
    <>
      {}
      <NavWrap>
        <NavGrid>
          <Menu />
          <LifeCounter />
          <Records />
          <Manage />
          <button
            onClick={() =>
              dispatch(
                startRound({ prevState: playState, playerTeam: playerTeams[teamSelected] })
              )
            }
            style={{ gridRow: "1 / 2" }}
          >
            Next round
          </button>
          <button
            onClick={() =>
              dispatch(
                endTurn()
              )
            }
            style={{ gridRow: "1 / 2" }}
          >
            End Turn
          </button>
        </NavGrid>
      </NavWrap>
    </>
  );
}
