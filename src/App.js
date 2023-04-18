import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Search from "./pages/Search";
import WishList from "./pages/WishList";
import Recent from "./pages/Recent";

import SideButton from "./components/SideButton";
import Footer from "./components/Footer";

// import Auth from "./services/Auth";
import KakaoLogin from "./services/KakaoLogin";
import Auth from "./services/Auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/recent" element={<Recent />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/kakaoLogin" element={<Auth />} />
      </Routes>
      <SideButton />
      <Footer />
    </Router>
  );
}

export default App;
