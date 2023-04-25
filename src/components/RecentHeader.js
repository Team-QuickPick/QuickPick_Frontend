import React, { Component } from "react";

import styles from "./Header.module.scss";

export default class RecentHeader extends Component {
  render() {
    return (
      <header className={styles.container}>
        <div className={styles.contents}>
          <div className={styles.text}>recent page</div>
        </div>
      </header>
    );
  }
}
