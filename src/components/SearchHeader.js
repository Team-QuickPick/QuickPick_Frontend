import React, { Component } from "react";
import styles from "./Header.module.scss";

export default class SearchHeader extends Component {
  render() {
    return (
      <header className={styles.container}>
        <div className={styles.contents}>
          <div>검색페이지</div>
        </div>
      </header>
    );
  }
}
