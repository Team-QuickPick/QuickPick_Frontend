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

  handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <nav className={styles.container}>
        <div className={styles.contents}>
          <Link to="/search" onClick={this.handleLinkClick}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" color="black" />
          </Link>
          <Link to="/" onClick={this.handleLinkClick}>
            <FontAwesomeIcon icon={faHouse} size="lg" color="black" />
          </Link>
          <Link to="/recent" onClick={this.handleLinkClick}>
            <FontAwesomeIcon icon={faClockRotateLeft} size="lg" color="black" />
          </Link>
        </div>
      </nav>
    );
  }
}
