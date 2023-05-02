import React, { useEffect, useState } from "react";

import styles from "./ShareBtn.module.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useScript } from "../hooks/hooks";
import KakaoShareBtn from "./KakaoShareBtn";

// 공유버튼 클릭 => 카카오톡 공유 버튼
const ShareBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [containerMounted, setContainerMounted] = useState(false);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  //window 객체에서 현재 url 가져오기
  const currentUrl = window.location.href;

  // kakao SDK import하기
  const status = useScript("https://developers.kakao.com/sdk/js/kakao.js");

  useEffect(() => {
    if (status === "ready") {
      setContainerMounted(true);
    }
  }, [status]);

  useEffect(() => {
    if (containerMounted) {
      createKakaoButton();
    }
  }, [containerMounted]);

  //kakao developers [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
  const createKakaoButton = () => {
    // kakao sdk script =>  window.Kakao로 접근 가능
    if (window.Kakao) {
      const kakao = window.Kakao;

      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_KEY);
      }
      // Add a container element for the KakaoTalk share button
      const container = document.getElementById("kakaotalk-sharing-btn");
      if (container) {
        //테스트 결과 => kakaotalk 공유하기
        //kakao developers 템플릿 정보
        kakao.Share.createDefaultButton({
          container: "#kakaotalk-sharing-btn",
          objectType: "feed",
          content: {
            title: "Quick-Pick",
            description: "#화장품 #빨리 #찾기",
            imageUrl:"https://ifh.cc/g/76JPyh.png",
            link: {
              mobileWebUrl: currentUrl,
              webUrl: currentUrl,
            },
          },
        });
      };
    }
  };


  return (
    <div className={styles.shareContainer}>
      <button className={styles.shareBtn} onClick={openModalHandler}>
        {isOpen ? "open" : "🔗 공유하기"}
      </button>
      {isOpen ? (
        <div
        className={styles.modalBackdrop}
        onClick={openModalHandler}
        >
        <div className={styles.modalView} role="dialog">
            <div 
            className={styles.kakaoBtn} 
            id="kakaotalk-sharing-btn"
            >
              <img src={kakaoLogo} alt="kakao icon"></img>
            </div>
            <KakaoShareBtn />
            <CopyToClipboard text={currentUrl}>
              <div className={styles.urlShareBtn}>URL</div>
            </CopyToClipboard>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ShareBtn;
