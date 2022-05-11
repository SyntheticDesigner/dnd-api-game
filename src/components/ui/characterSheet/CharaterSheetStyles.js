import styled from "styled-components";

export const CharSheet = styled.div`
    background-color:  tan;
    position: absolute;
    top: 50%;
    left: 50%;
    height: 80vh;
    width: 90%;
    z-index: 3;
    transform: translate(-50%, -50%);
    box-shadow: 0px 4px 8px hsla(0, 0%, 0%, 0.5);
    overflow: scroll;
    padding: 8px;
    & .actor-image{
     width: 150px;
    }
`;