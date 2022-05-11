import React, { useState, useEffect } from "react";
import CharacterSheet from "../ui/characterSheet/CharacterSheet";
import { Token } from "./GameBoardStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  loadActor,
  actorState,
  actorId,
} from "../../features/monster/makeActorSlice";
import ReactDOM from "react-dom";

export default function Actor({ actor, memberIndex, teamIndex }) {
  const dispatch = useDispatch();
  const selectedActor = useSelector(actorState);
  const [modal, setModal] = useState(false);

  useEffect(() => {}, [selectedActor]);
  return (
    <>
      {modal && ReactDOM.createPortal(
        <CharacterSheet actor={actor} modal={modal} setModal={setModal} />,
        document.getElementById("overlay-root")
      )}
      <Token
        onClick={() => {
          dispatch(loadActor(actor.member));
          setModal(!modal);
        }}
        x={teamIndex + 1}
        y={memberIndex + 1}
        z={0}
      >
        <img src={actor.member.actorImage} alt='' />
      </Token>
    </>
  );
}
