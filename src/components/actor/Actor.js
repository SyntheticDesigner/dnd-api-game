import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import CharacterSheet from "../ui/characterSheet/CharacterSheet";
import { ActorToken, TokenMenuGrid } from "./ActorStyled";
//import redux state
import {
  loadActor,
  actorState,
  toggleTarget,
  targetingSelectors,
  toggleTargetMode,
  targetModeState,
} from "../../features/actor/makeActorSlice";
import { updateMember, membersSelectors } from "../../features/teams/makeTeamSlice";
import { useDispatch, useSelector } from "react-redux";

//import images
import target from "../../assets/icons/target.svg";
import roundFrame from "../../assets/icons/round-frame.png";
import heartFrame from "../../assets/icons/heart-frame.png";
import sword from "../../assets/icons/sword.svg";
import shield from "../../assets/icons/shield.svg";
import squareFrame from "../../assets/icons/square-frame.svg";
import charSheet from "../../assets/icons/character.svg";
import skull from "../../assets/icons/skull.svg";

export default function Actor({ actor, memberIndex, teamIndex }) {
  const [selected, setSelected] = useState(false);
  const [targeted, setTargeted] = useState(false);
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const selectedActor = useSelector(actorState);
  const targetedActors = useSelector(targetingSelectors.selectIds);
  const targetMode = useSelector(targetModeState);
  const membersIds = useSelector(membersSelectors.selectIds);
  const memberEnts = useSelector(membersSelectors.selectEntities);



  useEffect(() => {
    if (selectedActor.id === actor.memberId) {
      //updates the member every time selectedActor changes
      // dispatch(updateMember(selectedActor));
      setSelected(true);
    } else {
      setSelected(false);
    }
    if (
      targetedActors.filter((targetId) => targetId === actor.memberId).length >
      0
    ) {
      setTargeted(true);
    } else {
      setTargeted(false);
    }
  }, [actor.memberId, selectedActor]);

  function clickHandler() {
    if (targetMode && !selected) {
      dispatch(toggleTarget(actor.member));
    } else if (!selected) {
      console.log("dont do this");
      console.log(memberEnts[actor.member.id].member)
      dispatch(loadActor(memberEnts[actor.member.id].member));
    }
  }

  const TokenMenu = () => {
    return (
      <TokenMenuGrid selected={selected}>
        <button
          className='target'
          onClick={() => {
            dispatch(toggleTargetMode());
          }}
        >
          <img className='targetFrame' src={roundFrame} alt='' />
          <img className='targetImg' src={target} alt='' />
        </button>
        <button className='monsterHeart'>
          <p>{actor.member.hp}</p>
          <img src={heartFrame} alt='' />
        </button>
        <button className='combatState'>
          <div className='shield'>
            <img src={squareFrame} alt='' />
            <img src={shield} alt='' />
          </div>
          <div className='sword'>
            <img src={squareFrame} alt='' />
            <img src={sword} alt='' />
          </div>
        </button>
        <button
          className='characterSheet'
          onClick={() => {
            setModal(!modal);
          }}
        >
          <img src={charSheet} alt='' />
        </button>
      </TokenMenuGrid>
    );
  };

  return (
    <>
      {modal &&
        ReactDOM.createPortal(
          <CharacterSheet actor={actor} modal={modal} setModal={setModal} />,
          document.getElementById("overlay-root")
        )}
      <ActorToken
        onClick={clickHandler}
        // onDoubleClick={() => {
        //   setModal(!modal);
        // }}
        // onContextMenu={(e) => {
        //   e.preventDefault();
        //   dispatch(toggleTarget(actor.member));
        // }}
        x={(teamIndex + 1) * (teamIndex + 1)}
        y={memberIndex + 1}
        z={0}
        selected={selected && targetMode}
        targeted={targeted}
      >
        <div className='actorWrap'>
          {actor.member.hp < 1 && <img src={skull} alt="nothing loading" />}
          <img src={actor.member.actorImage} alt='' />
        </div>
        <TokenMenu />
      </ActorToken>
    </>
  );
}
