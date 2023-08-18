import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import Nav from "./components/Nav";
import Test from "./Test";
import List from "./List";
import Detail from "./Detail";
import Login from "./Login";
import Join from "./Join";
import SubList from "./SubList";

function App() {
  return (
    <RecoilRoot>
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Test />} />
          <Route
            path="/list"
            element={
              <>
                <List />
              </>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <>
                <Detail />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/join"
            element={
              <>
                <Join />
              </>
            }
          />
          <Route
            path="/sublist"
            element={
              <>
                <SubList />
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
