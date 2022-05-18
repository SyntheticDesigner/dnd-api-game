import { useState, useEffect, useContext, useCallback } from "react";
import { getData } from "../../../utils/utils";
//------------------------------------------------------
import { useNavigate } from "react-router-dom";
import { ApiNavWrap } from "./ApiNavStyle";
import { useDispatch } from "react-redux";
import { setSrd } from "../../../features/ui/uiControlSlice";

export default function ApiNav({ open, hovApiNav, setHovApiNav }) {
  const [links, setLinks] = useState({});
  const [page, setPage] = useState("");
  const [pageRes, setPageRes] = useState({});
  const [pageContentLink, setPageContentLink] = useState("");
  const [pageContent, setPageContent] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    getData().then((res) => {
      setLinks(res);
      // console.log(res);
    });
    page &&
      getData(page).then((res) => {
        setPageRes(res);
        // console.log(res);
      });
    pageContentLink &&
      getData(pageContentLink).then((res) => {
        setPageContent(res);
      });
  }, [page, pageContentLink]);
  return (
    <ApiNavWrap>
      {Object.keys(links).map((keyName, i) => (
        <li key={keyName} style={{ margin: "auto", fontSize: "14px" }}>
          <button
            onClick={() => {
              setPage(links[keyName]);
              navigate(`/${keyName}`);
              dispatch(setSrd(false));
              //   setPageIndex(keyName);
            }}
          >
            {keyName}
          </button>
        </li>
      ))}
    </ApiNavWrap>
  );
}
