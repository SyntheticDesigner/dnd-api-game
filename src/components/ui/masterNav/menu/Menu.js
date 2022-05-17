import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import ReactDOM from "react-dom";
//import redux control
import {
  expandedMenuState,
  toggleTeamMngr,
  toggleSrd,
  toggleExpandedMenu,
  teamMngrState,
} from "../../../../features/ui/uiControlSlice";
//import styles
import {
  MenuBtnWrap,
  DndApiBtn,
  ExpandedWrap,
  TeamMngrWrap,
} from "./MenuStyle";
//import images
import close from "../../../../assets/icons/close-x.svg";
import myD20Logo from "../../../../assets/icons/myD20Logo.svg";
import teams from "../../../../assets/icons/teams.svg";

import TeamsMngr from "../favorites/TeamsMngr";

export default function Menu() {
  const dispatch = useDispatch();

  const expandedMenu = useSelector(expandedMenuState);
  const openTeamMngr = useSelector(teamMngrState);

  const TeamMngrBtn = () => {
    const dispatch = useDispatch();
    return (
      <TeamMngrWrap onClick={() => dispatch(toggleTeamMngr())}>
        <div className='imgWrap'>
          {/* <img className='bgIconImg' src={roundFrame} alt='not loading' /> */}
          <img className='iconImg' src={teams} alt='not loading' />
        </div>
      </TeamMngrWrap>
    );
  };

  function ExpandedMenu() {
    return (
      <ExpandedWrap modal={expandedMenu} key={nanoid()}>
        <TeamMngrBtn />
        <DndApiBtn onClick={() => dispatch(toggleSrd())}>
          <img
            src={process.env.PUBLIC_URL + "/images/d20.ico"}
            alt={`D&D API`}
          />
          {/* <p>{`D&D API`}</p> */}
        </DndApiBtn>
      </ExpandedWrap>
    );
  }
  return (
    <>
      {openTeamMngr &&
        ReactDOM.createPortal(
          <TeamsMngr />,
          document.getElementById("menu-root")
        )}
      <ExpandedMenu />
      <MenuBtnWrap
        modal={expandedMenu}
        onClick={() => {
          dispatch(toggleExpandedMenu());
        }}
      >
        <div className='imgWrap'>
          {/* <img className='bgIconImg' src={roundFrame} alt='not loading' /> */}
          {expandedMenu ? (
            <img id='close' src={close} alt='not loading' />
          ) : (
            <img id='myD20Logo' src={myD20Logo} alt='not loading' />
          )}
        </div>
      </MenuBtnWrap>
    </>
  );
}
