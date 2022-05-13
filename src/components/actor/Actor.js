import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import CharacterSheet from "../ui/characterSheet/CharacterSheet";
import { ActorToken } from "./ActorStyled";

import {
  loadActor,
  actorState,
  toggleTarget,
} from "../../features/actor/makeActorSlice";
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
      //updates the member every time selectedActor changes
      dispatch(updateMember(selectedActor));
      setSelected(true);
    } else {
      setSelected(false);
    }
    if (
      selectedActor.targeting.filter((target) => target.id === actor.memberId)
        .length > 0
    ) {
      setTargeted(true);
    } else {
      setTargeted(false);
    }
  }, [actor.memberId, selectedActor]);

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
        onContextMenu={(e) => {
          e.preventDefault();
          dispatch(toggleTarget(actor.member));
        }}
        x={teamIndex + 1}
        y={memberIndex + 1}
        z={0}
        selected={selected}
        targeted={targeted}
      >
        <div className='actorWrap'>
          <img src={actor.member.actorImage} alt='' />
        </div>
      </ActorToken>
    </>
  );
}
