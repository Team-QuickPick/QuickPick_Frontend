import styles from "./SideButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
function SideButton() {
  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [ScrollY, setScrollY] = useState(0); // 스크롤값을 저장하기 위한 상태
  const handleFollow = () => {
    setScrollY(window.pageYOffset); // window 스크롤 값을 ScrollY에 저장
  };
  useEffect(() => {
    //   console.log("ScrollY is ", ScrollY); // ScrollY가 변화할때마다 값을 콘솔에 출력
  }, [ScrollY]);
  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch(); // addEventListener 함수를 실행
    return () => {
      window.removeEventListener("scroll", handleFollow); // addEventListener 함수를 삭제
    };
  }, []);
  const displayStyle = {
    display: ScrollY > 0 ? "block" : "none",
  };
  return (
    <div className={styles.container} onClick={MoveToTop} style={displayStyle}>
      <div className={styles.upBtn}>
        <FontAwesomeIcon icon={faArrowCircleUp} size="2x" color="black" />
      </div>
    </div>
  );
}
export default SideButton;
