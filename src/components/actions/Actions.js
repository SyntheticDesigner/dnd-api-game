import React from "react";
import { generateKey, rollDice } from "../../utils/utils";
import { useState, useEffect } from "react";
import { ActionDetailsWrapper, ActionsWrap } from "./ActionStyle";

import { actorState } from "../../features/actor/makeActorSlice";
import { newAction } from "../../features/battle/actionSlice";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

export default function Actions({ actions }) {
  const [_actions, set_Actions] = useState({});
  const [dropDown, setDropDown] = useState(false);

  const actor = useSelector(actorState);
  const dispatch = useDispatch();

  useEffect(() => {
    actions && set_Actions(actions);
    // console.log(actions);
  }, [actions]);

  const Action = ({ action, memberId }) => {
    const [openDetails, setOpenDetails] = useState(false);
    return (
      <div key={nanoid()}>
        <div
          onClick={() => setOpenDetails(!openDetails)}
          className='actionName'
        >
          <h2>
            {action.name} <div className='arrow'>{openDetails ? "▲" : "▼"}</div>{" "}
          </h2>
          <button onClick={() => dispatch(newAction(action))} className='use'>
            Use Action
            {action.attack_bonus && <span>+{action.attack_bonus}</span>}
          </button>
        </div>
        {openDetails && <ActionDetails action={action} />}
      </div>
    );
  };

  const ActionDetails = ({ action }) => {
    return (
      <ActionDetailsWrapper>
        <p className='description'>{action.desc}</p>
        {action.options && (
          <div className='options'>
            {/* <p>Choose {action.options.choose}</p> */}
            <ul>
              {action.options.from.map((option, i) => (
                <li key={nanoid()}>
                  <ul>
                    {Object.keys(option).map((keyName, i) => (
                      <li key={nanoid()}>
                        <button>{option[keyName].name}</button>
                        {option[keyName].count > 1 &&
                          ` x ${option[keyName].count}`}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div>
          {action.damage &&
            action.damage.length &&
            action.damage.map((damage) =>
              damage.choose ? (
                <div key={generateKey(damage.choose)}>
                  <p>Choose {damage.choose}</p>
                  <ul>
                    {damage.from.map((damage) => (
                      <li key={generateKey(damage.damage_type.name)}>
                        <button>
                          {damage.damage_type.name} {damage.damage_type.url}
                        </button>
                        <ul>
                          <li>
                            <button
                              onClick={() => rollDice(damage.damage_dice)}
                            >
                              {damage.damage_dice}
                            </button>
                          </li>
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                damage.damage_type && (
                  <div key={generateKey(damage.damage_type)}>
                    <button>
                      {damage.damage_type.name} {damage.damage_type.url}
                    </button>
                    <ul>
                      <li>
                        <button onClick={() => rollDice(damage.damage_dice)}>
                          {damage.damage_dice}
                        </button>
                      </li>
                    </ul>
                  </div>
                )
              )
            )}
        </div>
        <div>
          {action.dc && (
            <>
              <p>DC {action.dc.dc_value}</p>
              <button>
                {action.dc.dc_type.name} {action.dc.dc_type.url}
              </button>
            </>
          )}
        </div>
        <div>
          {action.usage && (
            <p>
              {action.usage.times} time(s) {action.usage.type}
            </p>
          )}
        </div>
      </ActionDetailsWrapper>
    );
  };

  return _actions.length ? (
    <ActionsWrap>
      <h1>Actions</h1>
      {_actions.map((action) => (
        <Action action={action} />
      ))}
    </ActionsWrap>
  ) : (
    <p>No Actions</p>
  );
}
