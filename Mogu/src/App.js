import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Test from "./Test";
import List from "./List";
import Detail from "./Detail";
import Login from "./Login";
import Join from "./Join";
import SubList from "./SubList";

function App() {
  return (
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
  );
}

export default App;
