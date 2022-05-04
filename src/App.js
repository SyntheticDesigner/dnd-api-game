import { useState, useEffect, useContext, useCallback } from "react";
import { getData, rollDice } from "./utils/utils";
//------------------------------------------------------
import { useSelector, useDispatch } from "react-redux";
import MonsterPage from "./components/monsters/MonsterPage";
import ApiNav from "./components/ui/apiNav/ApiNav";
import { Outlet } from "react-router-dom";
import MiniTeamMngr from "./components/ui/teamMngr/MiniTeamMngr";
import MasterNav from "./components/ui/masterNav/MasterNav";

function App() {
  const [links, setLinks] = useState({});
  const [page, setPage] = useState("");
  const [pageIndex, setPageIndex] = useState("");
  const [pageRes, setPageRes] = useState({});
  const [pageContentLink, setPageContentLink] = useState("");
  const [pageContent, setPageContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [apiUrl, setApiUrl] = useState("");

  // useEffect(() => {
  //   getData().then((res) => {
  //     setLinks(res);
  //     // console.log(res);
  //   });
  //   page &&
  //     getData(page).then((res) => {
  //       setPageRes(res);
  //       setLoading(false);
  //       // console.log(res);
  //     });
  //   pageContentLink &&
  //     getData(pageContentLink).then((res) => {
  //       setPageContent(res);
  //     });
  // }, [page, pageContentLink, pageIndex]);

  const pageUi = pageRes["count"] ? (
    <div>
      {/* {_monsterName} */}
      {pageRes.results.map((data) => (
        <button
          key={data.index}
          onClick={() => {
            setPageContentLink(data.url);
          }}
        >
          {data.name}
        </button>
      ))}
    </div>
  ) : (
    <></>
  );

  return (
    <div>
      {/* <ApiNav apiUrl={apiUrl} setApiUrl={setApiUrl}/> */}
      <MasterNav/>
      <MiniTeamMngr />
      <Outlet context={[apiUrl, setApiUrl]} />
    </div>
  );
}

export default App;
