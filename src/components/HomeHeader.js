import React, { Component } from "react";
import styles from "./Header.module.scss";

export default class HomeHeader extends Component {
  render() {
    return (
      <header className={styles.container}>
        <div className={styles.contents}>
          <div>로고</div>
        </div>
      </header>
    );
  }
}
