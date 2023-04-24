// Navbar.js
import React, { Component } from "react";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockRotateLeft,
  faHouse,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

export default class Navbar extends Component {
  handleSearchIconClick = () => {
    if (this.props.onSearchIconClick) {
      this.props.onSearchIconClick();
    }
    if (this.props.onSearchTermChange) {
      this.props.onSearchTermChange("");
    }
    if (this.props.onStoreSelect) {
      this.props.onStoreSelect("");
    }
  };

  render() {
    return (
      <nav className={styles.container}>
        <div className={styles.contents}>
          <Link to="/search" onClick={this.handleSearchIconClick}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" color="black" />
          </Link>
          <Link to="/">
            <FontAwesomeIcon icon={faHouse} size="lg" color="black" />
          </Link>
          <Link to="/recent">
            <FontAwesomeIcon icon={faClockRotateLeft} size="lg" color="black" />
          </Link>
        </div>
      </nav>
    );
  }
}
