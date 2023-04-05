import React from "react";
import styles from "./Home.module.scss";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
    <div className={styles.container}>컨테이너 세팅</div>
    <Navbar></Navbar>
    </>
  )
}
