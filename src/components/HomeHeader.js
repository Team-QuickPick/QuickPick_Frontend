import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useAuth from "../services/useAuth";
import axios from "axios";

const HomeHeader = () => {
  const { isLoggedIn, logout, accessToken } = useAuth();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/users/profile/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUsername(response.data.username);
      } catch (error) {
        console.error(error);
      }
    };

    if (isLoggedIn) {
      fetchUsername();
    }
  }, [isLoggedIn, accessToken]);

  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <img className={styles.logoImg} src="img/Logo.png" alt="Logo" />
      </div>
      {isLoggedIn ? (
        <div className={styles.user} onClick={logout}>
          <FontAwesomeIcon icon={faUser} />
          <span>{`${username} 님 로그아웃`}</span>
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
