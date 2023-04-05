import React from "react";
import styles from "./Navbar.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="wrapper">
      <div><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
      <div><FontAwesomeIcon icon={faHouse} /></div>
      <div><FontAwesomeIcon icon={faHeart} /></div>
    </nav>
  );
};

export default Navbar;