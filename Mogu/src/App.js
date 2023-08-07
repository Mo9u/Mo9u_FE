import './App.css';
import{BrowserRouter,Routes,Route} from "react-router-dom";
import Nav from "./Nav";
import Test from "./Test";
import List from "./List";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav/>
        <Routes>
          <Route path="/" element={<Test />}/>
          <Route path="/list" element={<><List /></>}/>
        </Routes>  
      </div>
    </BrowserRouter>
  );
}

export default App;
