import React from "react";
import styles from "./WishList.module.scss";

import DetailHeader from "../components/DetailHeader";

export default function WishList() {
  return (
    <div className={styles.container}>
      <DetailHeader />
      WishList page
      <br />
    </div>
  );
}
