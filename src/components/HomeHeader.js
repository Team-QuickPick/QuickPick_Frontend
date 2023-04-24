import React from "react";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useAuth from "../services/useAuth";

const HomeHeader = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <img className={styles.logoImg} src="img/Logo.png" alt="Logo" />
      </div>
      {isLoggedIn ? (
        <div className={styles.user} onClick={logout}>
          <FontAwesomeIcon icon={faUser} />
          <span>로그아웃</span>
        </div>
      ) : (
        <Link to="/login" className={styles.user}>
          <FontAwesomeIcon icon={faUser} />
          <span>로그인</span>
        </Link>
      )}
    </header>
  );
};

export default HomeHeader;
