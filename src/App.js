import { useState, useEffect, useContext, useCallback } from "react";
//------------------------------------------------------
import { Outlet } from "react-router-dom";
import GameBoard from "./components/gameBoard/GameBoard";
import MasterNav from "./components/ui/masterNav/MasterNav";
import { AppWrap, RecordsWrapper } from "./StyledComponents";
import { getData } from "./utils/utils";

import { loadingState, loadMonsters } from "./features/play/playSlice";

import { useSelector, useDispatch } from "react-redux";

import ReactDOM from "react-dom";
import Loading from "./components/loading/Loading";

function App() {
  const [apiUrl, setApiUrl] = useState("");
  const loading = useSelector(loadingState);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      dispatch(loadMonsters());
    }
  }, [loaded]);

  return (
    <AppWrap>
      <MasterNav />
      <GameBoard />
      {loading &&
        ReactDOM.createPortal(
          <Loading />,
          document.getElementById("loading-root")
        )}
      {ReactDOM.createPortal(
        <Outlet context={[apiUrl, setApiUrl]} />,
        document.getElementById("api-root")
      )}
    </AppWrap>
  );
}

export default App;
