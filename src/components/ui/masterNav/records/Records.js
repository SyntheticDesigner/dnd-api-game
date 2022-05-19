import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Record, RecordsBtnWrap, RecordsWrapper } from "./RecordsStyle";
import {
  toggleRecordTbl,
  recordTblState,
} from "../../../../features/ui/uiControlSlice";
import { actionHistoryState } from "../../../../features/action/actionSlice";

import roundFrame from "../../../../assets/icons/round-frame.png";
import close from "../../../../assets/icons/close-x.svg";
import records from "../../../../assets/icons/records.svg";
import { nanoid } from "@reduxjs/toolkit";

const Records = () => {
  const dispatch = useDispatch();
  const recordsModal = useSelector(recordTblState);
  const actionHistory = useSelector(actionHistoryState);

  const RecordsTable = () => {
    return (
      <>
        <RecordsWrapper modal={recordsModal} className='recordsWrapper'>
          <ul>
            {actionHistory.length > 0 &&
              actionHistory.map((action) => (
                <Record key={nanoid()}>
                  <h1>{action.user.actorObject.name}</h1>
                  <p>({action.user.id})</p>
                  <h2>Performed: {action.action.name}</h2>
                  <h3>Rolled a {action.attackRoll}</h3>
                  <div>
                    <ul>
                      {action.targets.ids.length > 0 &&
                        action.targets.ids.map((targetIds) => (
                          <li key={nanoid()}>
                            <hr />
                            <div>
                              <h1>
                                {action.attackResults.entities[targetIds].hit
                                  ? "Hit"
                                  : "Miss"}
                              </h1>
                              <h1>
                                {
                                  action.targets.entities[targetIds].actorObject
                                    .name
                                }
                              </h1>
                              <p>({targetIds})</p>
                            </div>
                            <h2>
                              for {action.attackResults.entities[targetIds].hit &&
                                action.attackResults.entities[targetIds].dmg} Damage
                            </h2>
                          </li>
                        ))}
                    </ul>
                  </div>
                </Record>
              ))}
          </ul>
        </RecordsWrapper>
      </>
    );
  };
  return (
    <>
      {ReactDOM.createPortal(
        <RecordsTable />,
        document.getElementById("overlay-root")
      )}
      <RecordsBtnWrap onClick={() => dispatch(toggleRecordTbl())}>
        <div className='imgWrap'>
          <img className='bgIconImg' src={roundFrame} alt='not loading' />
          <img className='recordsIconImg' src={records} alt='not loading' />
        </div>
      </RecordsBtnWrap>
    </>
  );
};

export default Records;
