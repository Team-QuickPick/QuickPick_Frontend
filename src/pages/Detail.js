import React from "react";
import styles from "./Home.module.scss";

import DetailHeader from "../components/DetailHeader";

export default function Detail() {
  return (
    <div className={styles.container}>
      <DetailHeader />
      detail page
      <br />
    </div>
  );
}
