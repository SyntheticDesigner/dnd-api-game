import React from "react";
import { generateKey, rollDice } from "../../utils/utils";
import styled from "styled-components";
import { useState, useEffect } from "react";

export default function Action({ actions }) {
  const [_actions, set_Actions] = useState({});
  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {
    actions && set_Actions(actions);
    // console.log(actions);
  }, [actions]);



  return dropDown ? (
    _actions.length ? (
      <>
        <h2>Actions</h2>
        <button onClick={() => setDropDown(!dropDown)}>collapse</button>
        {_actions.map((action) => (
          <div key={generateKey(action.name)}>
            <p>{action.name}</p>
            <p>{action.desc}</p>
            {action.attack_bonus && <p>Attack Bonus: {action.attack_bonus}</p>}
            {action.options && (
              <div>
                {/* <p>Choose {action.options.choose}</p> */}
                <ul>
                  {action.options.from.map((option, i) => (
                    <li key={generateKey(i)}>
                      <ul>
                        {Object.keys(option).map((keyName, i) => (
                          <li key={generateKey(option[keyName].name)}>
                            {option[keyName].count > 1 && option[keyName].count}{" "}
                            {option[keyName].name}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              {action.damage && action.damage.length ? (
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
                            <button
                              onClick={() => rollDice(damage.damage_dice)}
                            >
                              {damage.damage_dice}
                            </button>
                          </li>
                        </ul>
                      </div>
                    )
                  )
                )
              ) : (
                <p>No Damage</p>
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
          </div>
        ))}
      </>
    ) : (
      <p>No Actions</p>
    )
  ) : (
    <>
      <h2>Actions</h2>
      <button onClick={() => setDropDown(!dropDown)}>expand</button>
    </>
  );
}
