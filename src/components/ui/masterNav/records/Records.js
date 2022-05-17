import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { RecordsBtnWrap, RecordsWrapper } from "./RecordsStyle";
import { toggleRecordTbl, recordTblState } from "../../../../features/ui/uiControlSlice";

import roundFrame from "../../../../assets/icons/round-frame.png";
import close from "../../../../assets/icons/close-x.svg";
import records from "../../../../assets/icons/records.svg";

const Records = () => {
  const dispatch = useDispatch();
  const recordsModal = useSelector(recordTblState);

  const RecordsTable = () => {
    return (
      <>
        <RecordsWrapper modal={recordsModal}  className='recordsWrapper'></RecordsWrapper>
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
