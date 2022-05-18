import React, { useState, useEffect } from "react";
import {
  ListWrap,
  MonsterBtn,
  MonsterListBtn,
  SmallImg,
} from "./MonsterPageStyles";
import { useNavigate, useParams } from "react-router-dom";
import CloseBtn from "../ui/setPieces/CloseBtn";
export default function MonsterList({ data, setMonsterUrl }) {
  const [listOpen, setListOpen] = useState(true);
  const params = useParams();
  useEffect(() => {
    params.monsterId &&
      setMonsterUrl(
        data.filter(({ index }) => index === params.monsterId)[0].url
      );
  }, [params]);
  let navigate = useNavigate();
  return (
    <ListWrap open={listOpen}>
      <div className='flexMonsterListBtn'>
        <MonsterListBtn onClick={() => setListOpen(!listOpen)}>
          Monsters
        </MonsterListBtn>
        {listOpen && <CloseBtn click={() => navigate("/")} />}
      </div>
      {data.map((data) => (
        <li key={data.index}>
          <button
            onClick={() => navigate(`/monsters/${data.index}/`)}
            img={`https://5e.tools/img/MM/${data.name
              .split(",")[0]
              .split("/")[0]
              .split("(")[0]
              .trim()}.png`}
          >
            <p>{data.name.split("/").join("/ ")}</p>
            <SmallImg
              src={`https://5e.tools/img/MM/${data.name
                .split(",")[0]
                .split("/")[0]
                .split("(")[0]
                .trim()}.png`}
              alt=''
            />
          </button>
        </li>
      ))}
    </ListWrap>
  );
}
