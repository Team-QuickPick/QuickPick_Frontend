import React from "react";
import styles from "./Search.module.scss";
import Navbar from "../components/Navbar";
import SearchHeader from "../components/SearchHeader";
import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import SelectStore from "../components/SelectStore";
import axios from "axios";

export default function Search() {
  return <div className={styles.container}>search 페이지</div>;
}
