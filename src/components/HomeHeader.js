import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/useAuth";
import styles from "./Header.module.scss";

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

  const renderUser = () => {
    if (isLoggedIn) {
      return (
        <div className={styles.user}>
          <span>{`${username} 님`}</span>
          <button type="button" onClick={logout}>
            로그아웃
          </button>
        </div>
      );
    } else {
      return (
        <div className={styles.user}>
          <Link to="/login">
            <button type="button">
              <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
              <span>로그인</span>
            </button>
          </Link>
        </div>
      );
    }
  };

  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <img className={styles.logoImg} src="img/Logo.png" alt="Logo" />
      </div>
      {renderUser()}
    </header>
  );
};

export default HomeHeader;
