import React, { useState } from "react";
import Actions from "../../actions/Actions";
import RollModifier from "../setPieces/RollModifier";
import { AbilitiesWrap, CharSheet, MenuWrap } from "./CharaterSheetStyles";


import { actorState } from "../../../features/actor/makeActorSlice";
import { useSelector } from "react-redux";

export default function CharacterSheet({
  // actor: { actor, memberId },
  modal,
  setModal,
}) {
  const actor = useSelector(actorState);

  const Abilities = ({ actor }) => {
    let abilityArray = [
      { name: "STR", score: actor.strength },
      { name: "DEX", score: actor.dexterity },
      { name: "CON", score: actor.constitution },
      { name: "INT", score: actor.intelligence },
      { name: "WIS", score: actor.wisdom },
      { name: "CHA", score: actor.charisma },
    ];
    return (
      <AbilitiesWrap>
        {abilityArray.map((ability) => (
          <div
            key={ability.name}
            title='Ability scores determine a characters proficiency in a specific characteristic. Click to roll a d20 and add the bonus granted by your ability score.'
            className='abilityScore'
          >
            <p>{ability.name}</p>
            <p className='score'>{ability.score}</p>
            <RollModifier score={ability.score} />
          </div>
        ))}
      </AbilitiesWrap>
    );
  };

  const Menu = ({ actor }) => {
    const [tabSelected, setTabSelected] = useState("actions");
    return (
      <MenuWrap>
        <nav>
          <ul>
            <li>
              <button
                onClick={() => setTabSelected("actions")}
                className={tabSelected === "actions" ? "selected" : undefined}
              >
                Actions
              </button>
            </li>
            <li>
              <button
                onClick={() => setTabSelected("spells")}
                className={tabSelected === "spells" ? "selected" : undefined}
              >
                Spells
              </button>
            </li>
            <li>
              <button
                onClick={() => setTabSelected("inventory")}
                className={tabSelected === "inventory" ? "selected" : undefined}
              >
                Inventory
              </button>
            </li>
            <li>
              <button
                onClick={() => setTabSelected("features")}
                className={tabSelected === "features" ? "selected" : undefined}
              >{`Features & Traits`}</button>
            </li>
            <li>
              <button
                onClick={() => setTabSelected("notes")}
                className={tabSelected === "notes" ? "selected" : undefined}
              >
                Notes
              </button>
            </li>
          </ul>
        </nav>
        <section>
          {tabSelected === "actions" && <Actions actions={actor.actions} />}
        </section>
      </MenuWrap>
    );
  };

  return (
    <CharSheet>
      <button className='close-btn' onClick={() => setModal(false)}>
        close
      </button>
      <div className='info-panel'>
        <div className='flex'>
          <img className='actor-image' src={actor.actorImage} alt='' />
          <section className='top'>
            <h1>{actor.actorObject.name}</h1>
            <p>Level: {actor.actorObject.challenge_rating}</p>
          </section>
        </div>

        <section className='flex bottom'>
          <p className='tag'>Size: {actor.actorObject.size}</p>
          <p className='tag'>Type: {actor.actorObject.type}</p>
        </section>
      </div>
      <Abilities actor={actor.actorObject} />
      <Menu actor={actor.actorObject} />
      {/* {JSON.stringify(actor.actorObject)} */}
    </CharSheet>
  );
}
