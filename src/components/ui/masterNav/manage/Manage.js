import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CharToken, ManageBtnWrap, TableWrapper } from "./ManageStyle";
import { useDispatch, useSelector } from "react-redux";

import {
  toggleMyTeamTbl,
  myTeamTblState,
  teamSelected,
} from "../../../../features/ui/uiControlSlice";
import { teamsSelectors, addMember } from "../../../../features/teams/makeTeamSlice";

import squareFrame from "../../../../assets/icons/square-frame.png";
import crown from "../../../../assets/icons/crown.svg";
const Manage = () => {
  const dispatch = useDispatch();
  const teamTblModal = useSelector(myTeamTblState);
  const selectedTeam = useSelector(teamSelected);
  const allTeams = useSelector(teamsSelectors.selectEntities);

  const [favList, setFavList] = useState({});

  // const favoritesList = allTeams[selectedTeam].favorites;

  function addToTeam(member){
    console.log(member);
    dispatch(addMember({teamId: selectedTeam, member: member}))
  }
  // const teamFavorites = useSelector(favoritesSelectors.selectEntities(teamSelected))
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
          {teamSelected && allTeams[selectedTeam] ? (
            <ul>
              {allTeams[selectedTeam].favorites.ids.length > 0 &&
                allTeams[selectedTeam].favorites.ids.map((id) => (
                  <CharToken key={id}>
                    <button onClick={()=>addToTeam(allTeams[selectedTeam].favorites.entities[id])}>
                      <p>
                        {
                          allTeams[selectedTeam].favorites.entities[id]
                            .actorObject.name
                        }
                      </p>
                      <img
                        src={
                          allTeams[selectedTeam].favorites.entities[id]
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
