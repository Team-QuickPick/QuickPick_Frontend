import React, { useEffect, useRef, useState } from "react";
import styles from "./Home.module.scss";
import Navbar from "../components/Navbar";
import HomeHeader from "../components/HomeHeader";

import axios from 'axios';

// const dummyData = [
  // {
  //   "pk": 21,
  //   "name": "닥터지 레드블레미쉬 클리어 수딩크림",
  //   "price": 22600,
  //   "image": null,
  //   "product_location": [
  //     1,
  //     2
  //   ]
  // },
  // {
  //   "pk": 22,
  //   "name": "필리밀리 쿠션 팡팡퍼프 5P",
  //   "price": 8500,
  //   "image": null,
  //   "product_location": [
  //     1,
  //     2,
  //     3
  //   ]
  // },
  // {
  //   "pk": 23,
  //   "name": "클린 웜코튼 30ml",
  //   "price": 27000,
  //   "image": null,
  //   "product_location": [
  //     1,
  //     3,
  //     4
  //   ]
  // },
  // {
  //   "pk": 24,
  //   "name": "웨이크메이크 마스카라",
  //   "price": 12000,
  //   "image": null,
  //   "product_location": [
  //     1
  //   ]
  // },
  // {
  //   "pk": 25,
  //   "name": "센카 퍼펙트 휩 페이셜 워시 2입",
  //   "price": 11500,
  //   "image": null,
  //   "product_location": [
  //     1,
  //     5
  //   ]
  // },
  // {
  //   "pk": 26,
  //   "name": "트리헛 시어 슈가 스크럽",
  //   "price": 13000,
  //   "image": null,
  //   "product_location": [
  //     1
  //   ]
  // },
  // {
  //   "pk": 27,
  //   "name": "유시몰 화이트닝 치약 106g",
  //   "price": 12900,
  //   "image": null,
  //   "product_location": [
  //     1,
  //     2
  //   ]
  // },
  // {
  //   "pk": 28,
  //   "name": "라보에이치 샴푸",
  //   "price": 27600,
  //   "image": null,
  //   "product_location": [
  //     1,
  //     4
  //   ]
  // },
  // {
  //   "pk": 29,
  //   "name": "어노브 딥 데미지 트리트먼트 EX",
  //   "price": 14900,
  //   "image": null,
  //   "product_location": [
  //     1
  //   ]
  // },
  // {
  //   "pk": 30,
  //   "name": "필리밀리 뿌리 볼륨 롤 브러시",
  //   "price": 11500,
  //   "image": null,
  //   "product_location": [
  //     1
  //   ]
  // },
  // {
  //   "pk": 31,
  //   "name": "포맨트 시그니처 퍼퓸 50ml",
  //   "price": 49000,
  //   "image": null,
  //   "product_location": [
  //     1
  //   ]
  // },
  // {
  //   "pk": 32,
  //   "name": "투쿨포스쿨 바이로댕 쉐이딩 기획",
  //   "price": 16000,
  //   "image": null,
  //   "product_location": [
  //     1
  //   ]
  // },
  // {
  //   "pk": 33,
  //   "name": "바닐라코 클린잇제로 클렌징 밤",
  //   "price": 18000,
  //   "image": null,
  //   "product_location": [
  //     1,
  //     2
  //   ]
  // },
  // {
  //   "pk": 34,
  //   "name": "헉슬리 퍼퓸 핸드크림",
  //   "price": 15000,
  //   "image": null,
  //   "product_location": [
  //     1
  //   ]
  // },
  // {
  //   "pk": 35,
  //   "name": "플랙커스 마이크로민트 치실 36개입",
  //   "price": 3700,
  //   "image": null,
  //   "product_location": [
  //     1
  //   ]
  // },
  // {
  //   "pk": 36,
  //   "name": "달바 화이트 트러플 퍼스트 스프레이 세럼 100ml",
  //   "price": 29900,
  //   "image": null,
  //   "product_location": [
  //     1
  //   ]
  // }
// ];

export default function Home() {
  // 광고 캐러셀
  const adContainerRef = useRef(null);
  const adInnerRef = useRef(null);
  const button1Ref = useRef(null);
  const button2Ref = useRef(null);
  const button3Ref = useRef(null);

  const [activeSlide, setActiveSlide] = useState(0);

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


  // 인기 상품
  const [popularProductList, setPopularProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPopularProductHandler = async () => {
    try{
      const result = await axios.get('http://127.0.0.1:8000/api/v1/products/');
      console.log(result)
      //반환=> [{name, imageurl, brandName, defaultPrice, salePrice },{},{}... 총 10개]
      if(result){
        setPopularProductList(result.data);
        setLoading(false);
      }
    } catch (error) {
      console.log("인기 상품 데이터 조회 실패",error.message);
      // setPopularProductList(dummyData);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchPopularProductHandler();
    setLoading(false);
  }, []);


  return (

    <>
      <HomeHeader />
      <div className={styles.container}>
        
        {/* 광고 */}
        <div className={styles.ad}>
          {/* 캐러셀 */}
          <div className={styles.adContainer} ref={adContainerRef}>
            <div className={styles.adInner} ref={adInnerRef}>
              <img alt="Ad1" src="img/HomeAd1.png" /> 
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
              onClick={() => setActiveSlide(0)} />
            <div
              className={styles.button2}
              ref={button2Ref}
              onClick={() => setActiveSlide(1)} />
            <div
              className={styles.button3}
              ref={button3Ref}
              onClick={() => setActiveSlide(2)} />
          </div>
        </div>


        {/* 인기상품 */}
        <div className={styles.best}>
          <div className={styles.text}>인기 상품</div>

          {/* get 요청 */}
          <div className={styles.bestContainer}>
            {popularProductList.map((item, index) => {
              return (
                  <div className={styles.bestItems}>
                    <div className={styles.bestImg}>{item.image}이미지</div>
                    <div className={styles.bestName}>{item.name}</div>
                    <div className={styles.bestPrice}>{item.price}</div>
                  </div>
              )
            })}
          </div>
        </div>

      </div>
      <Navbar />
    </>

  );
}
