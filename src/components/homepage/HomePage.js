import React from "react";
import { HomePageWrapper } from "./StyledHomePage";
import { useSelector, useDispatch } from "react-redux";
import {
  tutorialState,
  setTutorial,
  setGameStart,
} from "../../features/ui/uiControlSlice";

const HomePage = () => {
  const tutorial = useSelector(tutorialState);
  const dispatch = useDispatch();

  return (
    <HomePageWrapper>
      <ul>
        <li>
          <button onClick={() => dispatch(setGameStart(true))}>Play</button>
        </li>
        <li>
          <button>How to Play</button>
        </li>
        <li>
          <button>Browse {`D&D`}</button>
        </li>
        <div>
          <input
            type='checkbox'
            name='tutorial'
            id='tutorial'
            checked={tutorial}
            onChange={() => dispatch(setTutorial(!tutorial))}
          />
          <label htmlFor='tutorial'>Skip Tutorial</label>
        </div>
      </ul>
    </HomePageWrapper>
  );
};

export default HomePage;
