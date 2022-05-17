import React, { useState } from "react";
import ApiNav from "../apiNav/ApiNav";
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

import Menu from "./menu/Menu";
import Records from "./records/Records";
import Manage from "./manage/Manage";

export default function MasterNav() {
  const [showApiNav, setShowApiNav] = useState(false);
  const [showMiniMngr, setShowMiniMngr] = useState(false);
  const [hovApiNav, setHovApiNav] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          <ApiNav
            open={showApiNav}
            setHovApiNav={setHovApiNav}
            hovApiNav={hovApiNav}
          />
          <Menu />
          <LifeCounter />
          <Records />
          <Manage />

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
