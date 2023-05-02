import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Search from "./pages/Search";
import WishList from "./pages/WishList";
import Recent from "./pages/Recent";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import SideButton from "./components/SideButton";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* 추가 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/recent" element={<Recent />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <SideButton />
      <Footer />
    </Router>
  );
}

export default App;
