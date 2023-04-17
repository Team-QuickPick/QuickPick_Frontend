import React, { Component } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function handleLogin() {
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  window.location.href = KAKAO_AUTH_URL;
}

export default class HomeHeader extends Component {
  render() {
    return (
      <header className={styles.container}>
        <div className={styles.logo}>
          <img className={styles.logoImg} src="img/Logo.png" />
        </div>
        <div className={styles.user}>
          <button onClick={handleLogin}>카카오로 시작하기</button>
          {/* <div className={styles.userIcon}>
            <Link to="/">
              <FontAwesomeIcon icon={faUser} size="lg" color="black" />
            </Link>
          </div> */}
        </div>
      </header>
    );
  }
}
