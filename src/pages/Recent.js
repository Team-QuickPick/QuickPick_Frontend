import React from "react";
import styles from "./Recent.module.scss";

import Navbar from "../components/Navbar";
import RecentHeader from "../components/RecentHeader";

export default function Recent() {
  return (
    <>
      <RecentHeader />
      <div className={styles.container}>
        Recent page
      </div>
      <Navbar />
    </>
  );
}
