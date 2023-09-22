import "./App.css";
import Create from "../src/components/Create/index";
import Home from "../src/components/Home/index";
import Uploadfrom from "../src/components/Uploadfrom/index";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Create" element={<Create />} />
          <Route path="/edit/:id" element={<Uploadfrom />} />
          {/* <Route
            path="Reduxinformationdata"
            element={<Reduxinformationdata />}
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
