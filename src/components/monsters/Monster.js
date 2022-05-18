import React from "react";
import { getData, rollDice, generateKey } from "../../utils/utils";
import Actions from "../actions/Actions";
import { HitPoints, MonsterOverview } from "./MonsterPageStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  setMonsterIndex,
  setMonsterObject,
  actorObject,
  actorImage,
  actorState,
} from "../../features/actor/makeActorSlice";
import { addMember, addFavorite } from "../../features/teams/makeTeamSlice";
import RollModifier from "../ui/setPieces/RollModifier";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate, useParams } from "react-router-dom";
import { teamSelected } from "../../features/ui/uiControlSlice";
import CloseBtn from "../ui/setPieces/CloseBtn";

export default function Monster() {
  const monsterImg = useSelector(actorImage);
  const monster = useSelector(actorObject);
  const monState = useSelector(actorState);

  const navigate = useNavigate();

  const selectedTeam = useSelector(teamSelected);

  const dispatch = useDispatch();
  const params = useParams();

  const addToFavorites = () => {
    dispatch(addFavorite({ teamId: selectedTeam, member: monState }));
  };
  const conditionImmunities = monster.condition_immunities.length ? (
    <div className='fullLine'>
      Condition Immunities: <br />
      <section>
        {monster.condition_immunities.map((data) => (
          <p key={nanoid()}>{data.name}</p>
        ))}
      </section>
    </div>
  ) : (
    <></>
  );
  const damageImmunities = monster.damage_immunities.length ? (
    <div className='fullLine'>
      Damage Immunities: <br />
      <section>
        {monster.damage_immunities.map((data) => (
          <p key={nanoid()}>{data}</p>
        ))}
      </section>
    </div>
  ) : (
    <></>
  );
  const damageResistances = monster.damage_resistances.length ? (
    <div className='fullLine'>
      Damage Resistances: <br />
      <section>
        {monster.damage_resistances.map((data) => (
          <p key={nanoid()}>{data}</p>
        ))}
      </section>
    </div>
  ) : (
    <></>
  );
  const damageVulnerabilities = monster.damage_vulnerabilities.length ? (
    <div className='fullLine'>
      Damage Vulnerabilities: <br />
      <section>
        {monster.damage_vulnerabilities.map((data) => (
          <p key={nanoid()}>{data}</p>
        ))}
      </section>
    </div>
  ) : (
    <></>
  );

  return (
    params.monsterId &&
    monster.name && (
      <>
        <MonsterOverview>
          <button className='addToTeam' onClick={addToFavorites}>
            Add to Favorites
          </button>
          <img src={monsterImg} alt={monster.name} />
          <h1>{monster.name}</h1>
          <h3 title='Challenge Rating indicates a level of difficulty'>
            CR: <br /> {monster.challenge_rating}
          </h3>
          <h3 title='AC: Armor Class - An attack roll must be at least this high to hit.'>
            AC: <br /> {monster.armor_class}
          </h3>
          <HitPoints>
            <p>{monster.hit_dice}</p>
            {monster.hit_points}
          </HitPoints>
          <h4 className='fullLine'>({monster.alignment})</h4>
          {/* <p>Size: {monster.size}</p> */}
          <div className='abilityScore'>
            <p>
              Int: <br /> {monster.intelligence}
            </p>
            <RollModifier score={monster.intelligence} />
          </div>
          <div className='abilityScore'>
            <p>
              Wis: <br /> {monster.wisdom}
            </p>
            <RollModifier score={monster.wisdom} />
          </div>
          <div className='abilityScore'>
            <p>
              Str: <br /> {monster.strength}
            </p>
            <RollModifier score={monster.strength} />
          </div>
          <div className='abilityScore'>
            <p>
              Dex: <br /> {monster.dexterity}
            </p>
            <RollModifier score={monster.dexterity} />
          </div>
          <div className='abilityScore'>
            <p>
              Char: <br /> {monster.charisma}
            </p>
            <RollModifier score={monster.charisma} />
          </div>
          {conditionImmunities}
          {damageImmunities}
          {damageResistances}
          {damageVulnerabilities}

          {monster.actions && <Actions actions={monster.actions} />}
        </MonsterOverview>
        <CloseBtn click={() => navigate(-1)} />
      </>
    )
  );
}
