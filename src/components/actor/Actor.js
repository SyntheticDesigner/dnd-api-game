import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import CharacterSheet from "../ui/characterSheet/CharacterSheet";
import { ActorToken } from "./ActorStyled";

import { loadActor, actorState, addTarget } from "../../features/actor/makeActorSlice";
import { updateMember } from "../../features/teams/makeTeamSlice";
import { useDispatch, useSelector } from "react-redux";



export default function Actor({ actor, memberIndex, teamIndex }) {
  const [selected, setSelected] = useState(false);
  const [targeted, setTargeted] = useState(false);
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const selectedActor = useSelector(actorState);

  useEffect(() => {
    if (selectedActor.id === actor.memberId) {
      setSelected(true);
    } else {
      setSelected(false);
    }
    if(selectedActor.targeting.filter((targetId)=>(targetId === actor.memberId)).length > 0){
      setTargeted(true);
    }else{
      setTargeted(false);
    }
    dispatch(updateMember(selectedActor));
  }, [actor.memberId, selectedActor]);

  useEffect(()=>{
    console.log("render");
  }, [selectedActor.targeting])
  return (
    <>
      {modal &&
        ReactDOM.createPortal(
          <CharacterSheet actor={actor} modal={modal} setModal={setModal} />,
          document.getElementById("overlay-root")
        )}
      <ActorToken
        onClick={() => {
          dispatch(loadActor(actor.member));
        }}
        onDoubleClick={() => {
          setModal(!modal);
        }}
        x={teamIndex + 1}
        y={memberIndex + 1}
        z={0}
        selected={selected}
        targeted={targeted}
        onContextMenu={(e)=>{
          e.preventDefault();
          dispatch(addTarget(actor.memberId));
        }}
      >
        <div className='actorWrap'>
          <img src={actor.member.actorImage} alt='' />
        </div>
      </ActorToken>
    </>
  );
}
