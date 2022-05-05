import React, { useState } from "react";
import ApiNav from "../apiNav/ApiNav";
import MiniTeamMngr from "../teamMngr/MiniTeamMngr";
import { CreateTeamWrap, DndApiBtn, NavGrid, NavWrap } from "./MasterNavStyle";

export default function MasterNav() {
  const [showApiNav, setShowApiNav] = useState(false);
  const [showMiniMngr, setShowMiniMngr] = useState(false);
  const [hovApiNav, setHovApiNav] = useState(false);
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
        <CreateTeamWrap>
          <button onClick={() => setShowMiniMngr(!showMiniMngr)}>Manage Teams</button>
        </CreateTeamWrap>
      </NavGrid>
      <MiniTeamMngr open={showMiniMngr}/>
    </NavWrap>
  );
}
