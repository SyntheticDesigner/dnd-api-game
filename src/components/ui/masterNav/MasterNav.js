import React, { useState } from "react";
import {
  LifeCountWrap,
  NavGrid,
  NavWrap,
  ManageBtnWrap,
} from "./MasterNavStyle";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import heartFrame from "../../../assets/icons/heart-frame.png";
import close from "../../../assets/icons/close-x.svg";

import { startRound, loadMonsters, play } from "../../../features/play/playSlice";

import Menu from "./menu/Menu";
import Records from "./records/Records";
import Manage from "./manage/Manage";

export default function MasterNav() {
  const [showApiNav, setShowApiNav] = useState(true);
  const [showMiniMngr, setShowMiniMngr] = useState(false);
  const [hovApiNav, setHovApiNav] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const playState = useSelector(play);

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
          <button onClick={()=>dispatch(startRound(playState))}style={{gridRow: "1 / 2"}}>Start Round</button>
          {/* <CreateTeamBtnWrap>
          <button onClick={() => setShowMiniMngr(!showMiniMngr)}>
            Manage Teams
          </button>
        </CreateTeamBtnWrap>
        <PlayBtn>
          <button>Play</button>
        </PlayBtn> */}
          {/* <button onClick={() => navigate(-1)}>Back</button>
        <button onClick={() => navigate("/")}>Close</button> */}
        </NavGrid>
      </NavWrap>
    </>
  );
}
