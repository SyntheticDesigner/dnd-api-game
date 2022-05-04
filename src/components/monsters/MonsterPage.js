import React from "react";
import { useState, useEffect } from "react";
import Monster from "./Monster";
import { useSelector, useDispatch } from "react-redux";
import {
  setMonsterIndex,
  setMonsterObject,
  monsterObject,
} from "../../features/monster/makeMonsterSlice";
import { getData } from "../../utils/utils";
import MonsterList from "./MonsterList";
import { PageWrap } from "./MonsterPageStyles";

export default function MonsterPage({ data, loading }) {
  const [monsterUrl, setMonsterUrl] = useState();
  const [monsterList, setMonsterList] = useState([]);
  const dispatch = useDispatch();
  const _monsterObject = useSelector(monsterObject);

  useEffect(() => {
    getData("/api/monsters").then((res) => {
      setMonsterList(res);
      console.log(res);
    });
    monsterUrl && getData(monsterUrl).then((res) => {
      dispatch(setMonsterObject(res));
    }) 
  }, [dispatch, monsterUrl]);
  return (
    <PageWrap>
      {monsterList.results && (
        <MonsterList data={monsterList.results} setMonsterUrl={setMonsterUrl} />
      )}
      <Monster monster={_monsterObject} />
    </PageWrap>
  );
}
