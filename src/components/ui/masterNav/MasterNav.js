import React, { useState } from "react";
import ApiNav from "../apiNav/ApiNav";
import MiniTeamMngr from "../teamMngr/MiniTeamMngr";
import { CreateTeamBtnWrap, DndApiBtn, NavGrid, NavWrap, PlayBtn } from "./MasterNavStyle";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { srdState, teamMngrState, gameStartState, setSrd, toggleSrd, setTeamMngr, toggleTeamMngr, setGameStart, toggleGameStart } from "../../../features/ui/uiControlSlice";

export default function MasterNav() {
  const [showApiNav, setShowApiNav] = useState(false);
  const [showMiniMngr, setShowMiniMngr] = useState(false);
  const [hovApiNav, setHovApiNav] = useState(false);
  const navigate= useNavigate();
  return (
    <NavWrap>
      <NavGrid>
        <li>
          <DndApiBtn onClick={() => setShowApiNav(!showApiNav)}>
            <img
              src={process.env.PUBLIC_URL + "/images/d20.ico"}
              alt={`D&D API`}
            />
            <p>{`D&D API`}</p>
          </DndApiBtn>
          <ApiNav
            open={showApiNav}
            setHovApiNav={setHovApiNav}
            hovApiNav={hovApiNav}
          />
        </li>
        <CreateTeamBtnWrap>
          <button onClick={() => setShowMiniMngr(!showMiniMngr)}>Manage Teams</button>
        </CreateTeamBtnWrap>
        <PlayBtn>
          <button>Play</button>
        </PlayBtn>
      <button onClick={()=>navigate(-1)}>Back</button>
      <button onClick={()=>navigate('/')}>Close</button>

      </NavGrid>
      <MiniTeamMngr open={showMiniMngr}/>
    </NavWrap>
  );
}
