import { Route, Routes } from "react-router-dom";
import "./App.scss";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Search from "./pages/Search";
import WishList from "./pages/WishList";
import Recent from "./pages/Recent";

import SideButton from "./components/SideButton";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/detail/1" element={<div> 1번째 제품 상세페이지 </div>} />
        <Route path="/search" element={<Search />} />
        <Route path="/recent" element={<Recent />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
      <SideButton />
      <Footer />
    </>
  );
}

export default App;
