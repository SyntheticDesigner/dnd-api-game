import React from "react";
import ReactDOM from "react-dom";
import { ManageBtnWrap, TableWrapper } from "./ManageStyle";
import { useDispatch, useSelector } from "react-redux";

import { toggleMyTeamTbl, myTeamTblState } from "../../../../features/ui/uiControlSlice";

import squareFrame from "../../../../assets/icons/square-frame.png";
import crown from "../../../../assets/icons/crown.svg";
const Manage = () => {
  const dispatch = useDispatch();
  const teamTblModal = useSelector(myTeamTblState);
  const ManageBtn = () => {
    return (
      <>
        <ManageBtnWrap onClick={() => dispatch(toggleMyTeamTbl())}>
          <div className='imgWrap'>
            <img className='bgIconImg' src={squareFrame} alt='not loading' />
            <img className='iconImg' src={crown} alt='not loading' />
          </div>
        </ManageBtnWrap>
      </>
    );
  };

  const ManageTable = () => {
    return (
      <>
        <TableWrapper modal={teamTblModal}></TableWrapper>
      </>
    );
  };
  return (
    <>
      {ReactDOM.createPortal(
        <ManageTable />,
        document.getElementById("overlay-root")
      )}
      <ManageBtn />
    </>
  );
};

export default Manage;
