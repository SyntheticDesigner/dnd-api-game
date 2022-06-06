import { useState, useEffect, useContext, useCallback } from "react";
//------------------------------------------------------
import { Outlet } from "react-router-dom";
import GameBoard from "./components/gameBoard/GameBoard";
import MasterNav from "./components/ui/masterNav/MasterNav";
import { AppWrap, RecordsWrapper } from "./StyledComponents";
import { getData } from "./utils/utils";

import {
  loadingState,
  loadMonsters,
  loadedState,
} from "./features/play/playSlice";
import { gameStartState } from "./features/ui/uiControlSlice";

import { useSelector, useDispatch } from "react-redux";

import ReactDOM from "react-dom";
import Loading from "./components/loading/Loading";
import HomePage from "./components/homepage/HomePage";

function App() {
  const [apiUrl, setApiUrl] = useState("");
  const loading = useSelector(loadingState);
  const gameStart = useSelector(gameStartState);
  const loaded = useSelector(loadedState);

  const dispatch = useDispatch();

  useEffect(() => {
    if (gameStart && !loaded) {
      dispatch(loadMonsters());
    }
  }, [loaded, gameStart]);

  return (
    <AppWrap>
      {!gameStart && <HomePage />}
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
