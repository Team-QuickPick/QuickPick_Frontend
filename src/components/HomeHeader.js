import React, { Component } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default class HomeHeader extends Component {
  render() {
    return (
      <header className={styles.container}>
        <div className={styles.logo}>
          <img className={styles.logoImg} src="img/Logo.png" />
        </div>
        <div className={styles.user}>
          <div  className={styles.userIcon}>
            <Link to="/">
                <FontAwesomeIcon icon={faUser} size="lg" color="black" />
            </Link>
          </div>
        </div>
      </header>
    );
  }
}
