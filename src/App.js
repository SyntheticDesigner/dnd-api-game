import { useState, useEffect, useContext, useCallback } from "react";
//------------------------------------------------------
import { Outlet } from "react-router-dom";
import GameBoard from "./components/gameBoard/GameBoard";
import MasterNav from "./components/ui/masterNav/MasterNav";
import { AppWrap, RecordsWrapper } from "./StyledComponents";
import { getData } from "./utils/utils";

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
    <AppWrap>
      <MasterNav />
      <Outlet context={[apiUrl, setApiUrl]} />
      <GameBoard />
    </AppWrap>
  );
}

export default App;
