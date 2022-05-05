import React, { useState } from "react";
import {
  ListWrap,
  MonsterBtn,
  MonsterListBtn,
  SmallImg,
} from "./MonsterPageStyles";

export default function MonsterList({ data, setMonsterUrl }) {
  const [listOpen, setListOpen] = useState(true);
  return (
    <ListWrap open={listOpen}>
      <MonsterListBtn onClick={() => setListOpen(!listOpen)}>
        Monsters {listOpen ? <span>▲</span> : <span>▼</span>}
      </MonsterListBtn>
      {data.map((data) => (
        <li key={data.index}>
          <button
            onClick={() => setMonsterUrl(data.url)}
            img={`https://5e.tools/img/MM/${data.name
              .split(",")[0]
              .split("/")[0]
              .split("(")[0]
              .trim()}.png`}
          >
            <p>{data.name.split('/').join('/ ')}</p>
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
