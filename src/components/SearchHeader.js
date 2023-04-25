import React, { Component } from "react";

import styles from "./Header.module.scss";

export default class SearchHeader extends Component {
  render() {
    return (
      <header className={styles.container}>
        <div className={styles.contents}>
          <div className={styles.text}>search page</div>
        </div>
      </header>
    );
  }
}
