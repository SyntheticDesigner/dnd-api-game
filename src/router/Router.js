import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
  import App from "../App";
import MonsterPage from "../components/monsters/MonsterPage";
  
  
  export default function MyRouter() {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<App />}>
            {/* <Route index element={<Home />} /> */}
            <Route exact path='monsters' element={<MonsterPage />} />
            <Route exact path='monsters/:monsterId' element={<MonsterPage />} />
          </Route>
        </Routes>
      </Router>
    );
  }