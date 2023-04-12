import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Search from "./pages/Search";
import WishList from "./pages/WishList";

import SideButton from "./components/SideButton";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
      <SideButton />
    </Router>
  );
}

export default App;
