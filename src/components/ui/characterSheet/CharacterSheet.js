import React from "react";
import { CharSheet } from "./CharaterSheetStyles";

export default function CharacterSheet({
  actor: { member, memberId },
  modal,
  setModal,
}) {
  return (
    <CharSheet>
      <img className='actor-image' src={member.actorImage} alt='' />
      <button onClick={() => setModal(false)}>close</button>

      {JSON.stringify(member)}
    </CharSheet>
  );
}
