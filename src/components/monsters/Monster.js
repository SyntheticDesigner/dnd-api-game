import React from "react";
import { getData, rollDice, generateKey } from "../../utils/utils";
import Actions from "../actions/Actions";
import { MonsterOverview } from "./MonsterPageStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  setMonsterIndex,
  setMonsterObject,
  monsterObject,
  monsterImage,
} from "../../features/monster/makeMonsterSlice";
import { addPartyMember, partyMembers } from "../../features/parties/makePartySlice";

export default function Monster() {
  const monsterImg = useSelector(monsterImage);
  const monster = useSelector(monsterObject);
  const party = useSelector(partyMembers);
  const dispatch = useDispatch();

  const addPartyClick = () => {
    dispatch(addPartyMember(monster));
  }
  return (
    monster.name && (
      <MonsterOverview>
        <button onClick={addPartyClick}>Add to Party</button>
        <img src={monsterImg} alt={monster.name} />
        <h1>{monster.name}</h1>
        <h3>({monster.alignment})</h3>
        <h3 title='Challenge Rating indicates a level of difficulty'>
          CR: {monster.challenge_rating}
        </h3>
        <p>Size: {monster.size}</p>
        <p>Int: {monster.intelligence}</p>
        <p>Wis: {monster.wisdom}</p>
        <p>Str: {monster.strength}</p>
        <p>Char: {monster.charisma}</p>
        <p>Dex: {monster.dexterity}</p>
        {monster.actions && <Actions actions={monster.actions} />}
      </MonsterOverview>
    )
  );
}
