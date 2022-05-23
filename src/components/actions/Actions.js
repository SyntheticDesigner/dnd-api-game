import React, { Fragment, useCallback } from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ActionDetailsWrapper, ActionModal, ActionsWrap } from "./ActionStyle";

import { rollDice } from "../../utils/utils";

import { actorState, loadActor } from "../../features/actor/makeActorSlice";

import {
  actionState as _actionState,
  attack,
  rollDamage,
  newAction,
  resetAction,
} from "../../features/action/actionSlice";
import {
  setActionModal,
  toggleActionModal,
  actionModalState,
} from "../../features/ui/uiControlSlice";

import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

export default function Actions({ actions }) {
  const [_actions, set_Actions] = useState({});
  // const [actionModal, setActionModal] = useState(false);
  const [damageDealt, setDamageDealt] = useState(false);

  const actionModal = useSelector(actionModalState);
  const actionState = useSelector(_actionState);
  const actor = useSelector(actorState);
  const dispatch = useDispatch();

  useEffect(() => {
    actions && set_Actions(actions);
  }, [actions]);

  useEffect(() => {
    console.log(actionModal);
  });

  useEffect(() => {
    if (!actionState.endAction) {
      if (actionState.hit) {
        setDamageDealt(true);
      } else {
        setDamageDealt(false);
      }
    }
    if (actionState.startAction && actionState.endAction) {
      dispatch(setActionModal(false));
      dispatch(resetAction(actionState));
      console.log("triggered");
    }
  }, [actionState]);

  const Action = ({ action }) => {
    const [openDetails, setOpenDetails] = useState(false);
    return (
      <>
        <div className='actionName'>
          <h2 onClick={() => setOpenDetails(!openDetails)}>
            {action.name} <div className='arrow'>{openDetails ? "▲" : "▼"}</div>{" "}
          </h2>
          <button
            onClick={() => {
              dispatch(setActionModal(true));
              dispatch(newAction({ action: action, actor: actor }));
              console.log("click");
            }}
            className='use'
          >
            Use Action
          </button>
        </div>
        {openDetails && <ActionDetails action={action} />}
      </>
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
                <div key={nanoid()}>
                  <p>Choose {damage.choose}</p>
                  <ul>
                    {damage.from.map((damage) => (
                      <li key={nanoid()}>
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
                  <div key={nanoid()}>
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

  const ActionWindow = () => {
    return (
      <ActionModal>
        <section>
          <button onClick={() => dispatch(setActionModal(false))}>Close</button>
          <h1>{actionState.action.name}</h1>
          {!damageDealt ? (
            <button
              onClick={() => {
                dispatch(attack());
              }}
            >
              Roll 1d20
              {actionState.action.attack_bonus > 0 && (
                <span>+{actionState.action.attack_bonus}</span>
              )}
            </button>
          ) : (
            <>
              {actionState.startAction &&
                actionState.action.damage.map((damage) => (
                  <Fragment key={nanoid()}>
                    {/* {JSON.stringify(damage.damage_dice)} */}
                    <h3>{damage.damage_dice}</h3>
                    <p>{damage.damage_type.name}</p>
                  </Fragment>
                ))}
              <button
                onClick={() => {
                  dispatch(rollDamage(actionState));
                }}
              >
                ROLL
              </button>
            </>
          )}
        </section>
      </ActionModal>
    );
  };

  return _actions.length ? (
    <>
      {actionModal &&
        // actionState.startAction &&
        ReactDOM.createPortal(
          <ActionWindow />,
          document.getElementById("action-root")
        )}
      <ActionsWrap>
        <h1>Actions</h1>
        {_actions.map((action) => (
          <Action action={action} key={nanoid()} />
        ))}
      </ActionsWrap>
    </>
  ) : (
    <p>No Actions</p>
  );
}
