import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CharToken, ManageBtnWrap, TableWrapper } from "./ManageStyle";
import { useDispatch, useSelector } from "react-redux";

import {
  toggleMyTeamTbl,
  myTeamTblState,
} from "../../../../features/ui/uiControlSlice";
import {
  teamsSelectors,
  addMember,
  teamSelectedState,
} from "../../../../features/teams/makeTeamSlice";

import squareFrame from "../../../../assets/icons/square-frame.png";
import crown from "../../../../assets/icons/crown.svg";
const Manage = () => {
  const dispatch = useDispatch();
  const teamTblModal = useSelector(myTeamTblState);
  const selectedTeam = useSelector(teamSelectedState);
  const allTeams = useSelector(teamsSelectors.selectEntities);

  const [acqList, setAcqList] = useState({});

  // const acquiredList = allTeams[selectedTeam].acquired;

  function addToTeam(member) {
    dispatch(addMember({ teamId: selectedTeam, member: member }));
  }
  // const teamAcquired = useSelector(acquiredSelectors.selectEntities(teamSelected))
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
        <TableWrapper modal={teamTblModal}>
          {selectedTeam && allTeams[selectedTeam] ? (
            <ul>
              {allTeams[selectedTeam].acquired.ids.length > 0 &&
                allTeams[selectedTeam].acquired.ids.map((id) => (
                  <CharToken key={id}>
                    <button
                      onClick={() =>
                        addToTeam(allTeams[selectedTeam].acquired.entities[id])
                      }
                    >
                      <p>
                        {
                          allTeams[selectedTeam].acquired.entities[id]
                            .actorObject.name
                        }
                      </p>
                      <img
                        src={
                          allTeams[selectedTeam].acquired.entities[id]
                            .actorImage
                        }
                        alt=''
                      />
                    </button>
                  </CharToken>
                ))}
            </ul>
          ) : (
            <>
              <h1>You have not made a team yet</h1>
              <button>Make a team</button>
            </>
          )}
        </TableWrapper>
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
