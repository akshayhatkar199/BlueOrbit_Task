import "./App.css";
import Productfrom from "../src/components/Productfrom/index";
import Productinformation from "../src/components/Productinformation/index";
import Reduxinformationdata from "./components/Reduxinformationdata/index";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Productfrom />} />
          <Route path="Productinformation" element={<Productinformation />} />
          <Route path="Reduxinformationdata" element={<Reduxinformationdata />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
