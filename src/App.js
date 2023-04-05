import { Route, Routes } from "react-router-dom";
import "./App.scss";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Search from "./pages/Search";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
