import React from "react";
import styled from "styled-components";

const LoadingScreen = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
  z-index: 1;
  position: fixed;
  top: 0;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  h1{
      position: absolute;
  }
`;

const Loading = () => {
  return (
    <LoadingScreen>
      <h1>Loading</h1>
    </LoadingScreen>
  );
};

export default Loading;
