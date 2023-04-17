import React, { useEffect, useRef, useState } from "react";
import styles from "./Home.module.scss";
import Navbar from "../components/Navbar";
import HomeHeader from "../components/HomeHeader";
import axios from "axios";
import Modal from "../components/Modal";

export default function Home() {
  // 광고 캐러셀
  const adContainerRef = useRef(null);
  const adInnerRef = useRef(null);
  const button1Ref = useRef(null);
  const button2Ref = useRef(null);
  const button3Ref = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    adContainerRef.current.style.transform = `translateX(-${
      activeSlide * adInnerRef.current.offsetWidth
    }px)`;
  }, [activeSlide]);

  useEffect(() => {
    setLoading(true);
    fetchPopularProductHandler();
    setLoading(false);
  }, []);

  // 인기 상품
  const [popularProductList, setPopularProductList] = useState([]);
  const [focusedItem, setFocusedItem] = useState({});
  const [loading, setLoading] = useState(false);
  const fetchPopularProductHandler = async () => {
    try {
      const result = await axios.get("http://127.0.0.1:8000/api/v1/products/");
      // console.log(result);
      if (result) {
        // setPopularProductList(result.data);
        // 데이터 랜덤으로 섞기
        const shuffledData = result.data.sort(() => Math.random() - 0.5);
        setPopularProductList(shuffledData);
        setLoading(false);
      }
    } catch (error) {
      console.log("인기 상품 데이터 조회 실패", error.message);
    }
  };
  // 모달
  const openModal = (item) => {
    setFocusedItem(item);
    setShowModal(true);
  };
  
  

  return (
    <>
      <HomeHeader />
      <div className={styles.container}>
        {/* 광고 */}
        <div className={styles.ad}>
          {/* 캐러셀 */}
          <div className={styles.adContainer} ref={adContainerRef}>
            <div className={styles.adInner} ref={adInnerRef}>
              <img alt="Ad1" src="img/HomeAd1.jpg" />
            </div>
            <div className={styles.adInner}>
              <img alt="Ad2" src="img/HomeAd2.jpg" />
            </div>
            <div className={styles.adInner}>
              <img alt="Ad3" src="img/HomeAd3.jpg" />
            </div>
          </div>
          {/* 버튼 */}
          <div className={styles.btn}>
            <div
              className={styles.button1}
              ref={button1Ref}
              onClick={() => setActiveSlide(0)}
            />
            <div
              className={styles.button2}
              ref={button2Ref}
              onClick={() => setActiveSlide(1)}
            />
            <div
              className={styles.button3}
              ref={button3Ref}
              onClick={() => setActiveSlide(2)}
            />
          </div>
        </div>
        {/* 인기상품 */}
        <div className={styles.best}>
          <div className={styles.text}>인기 상품</div>
          {/* get 요청 */}
          <div className={styles.bestContainer}>
            {popularProductList.slice(0, 10).map((item, index) => {
              return (
                <div key={`popularProduct${item.name}${index}`} className={styles.bestItems} onClick={()=>{openModal(item)}}>
                  <div className={styles.bestImg}>{item.image}이미지</div>
                  <div className={styles.bestName}>{item.name}</div>
                  <div className={styles.bestPrice}>{item.price}</div>
                </div>
              );
            })}
          </div>
        </div>
        <Modal showModal={showModal} setShowModal={setShowModal} renderItem={focusedItem} />
      </div>
      <Navbar />
    </>
  );
}
