import { useState, useEffect, useContext, useCallback } from "react";
import { getData, rollDice } from "../../../utils/utils";
//------------------------------------------------------
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ApiNav({ apiUrl, setApiUrl }) {
  const [links, setLinks] = useState({});
  const [page, setPage] = useState("");
  const [pageIndex, setPageIndex] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageRes, setPageRes] = useState({});
  const [pageContentLink, setPageContentLink] = useState("");
  const [pageContent, setPageContent] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    getData().then((res) => {
      setLinks(res);
      // console.log(res);
    });
    page &&
      getData(page).then((res) => {
        setPageRes(res);
        setLoading(false);
        // console.log(res);
      });
    pageContentLink &&
      getData(pageContentLink).then((res) => {
        setPageContent(res);
      });
  }, [page, pageContentLink, pageIndex]);
  return (
    <ul
      style={{
        display: "grid",
        listStyle: "none",
        gridTemplateColumns: "repeat(5, 1fr)",
        backgroundColor: "darkgrey",
        padding: "8px",
      }}
    >
      {Object.keys(links).map((keyName, i) => (
        <li key={keyName} style={{ margin: "auto", fontSize: "14px" }}>
          <button
            onClick={() => {
              setLoading(true);
              setPage(links[keyName]);
              setApiUrl(links[keyName]);
              navigate(`/${keyName}`);
            //   setPageIndex(keyName);
            }}
          >
            {keyName}
          </button>
        </li>
      ))}
    </ul>
  );
}
