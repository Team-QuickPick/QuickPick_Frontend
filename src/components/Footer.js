import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./Footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faYoutube } from "@fortawesome/free-brands-svg-icons";

export default class Footer extends Component {
  render() {
    return (
      <footer className={styles.container}>
        <Link to="/">
          <div className={styles.text1}>
            <div>
              <img src="img/Logo.png"></img>
            </div>
          </div>
        </Link>
        <div className={styles.text2}>
          <div>Quick Pick (주) | 사업자등록번호: 000-23-83272</div>
        </div>
        <div className={styles.text3}>
          <div>사업장주소지: 서울특별시 서초구</div>
        </div>
        <div className={styles.text4}>
          <div>이용약관 | 개인정보처리방침 | 청소년보호방침 | 법적고지</div>
        </div>
        <div className={styles.text5}>
          <div
            onClick={() =>
              window.open("https://github.com/Team-QuickPick", "_blank")
            }
          >
            <FontAwesomeIcon icon={faGithub} size="lg" color="black" />
          </div>
          <div
            onClick={() =>
              window.open(
                "https://www.youtube.com/channel/UCz7oHpfDARd7Vy1L9au2Rxg",
                "_blank"
              )
            }
          >
            <FontAwesomeIcon icon={faYoutube} size="lg" color="black" />
          </div>
        </div>
      </footer>
    );
  }
}
