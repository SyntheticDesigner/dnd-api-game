import React from "react";
import { ListWrap } from "./MonsterPageStyles";

export default function MonsterList({ data, setMonsterUrl }) {
  return (
    <ListWrap>
      {data.map((data) => (
        <li key={data.index}>
          <button onClick={() => setMonsterUrl(data.url)}>{data.name}</button>
        </li>
      ))}
    </ListWrap>
  );
}
