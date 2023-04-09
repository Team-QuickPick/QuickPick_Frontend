import React, { useEffect, useRef, useState } from "react";
import styles from "./Home.module.scss";
import Navbar from "../components/Navbar";
import HomeHeader from "../components/HomeHeader";

export default function Home() {
  const adContainerRef = useRef(null);
  const adInnerRef = useRef(null);
  const button1Ref = useRef(null);
  const button2Ref = useRef(null);
  const button3Ref = useRef(null);

  // const [popularProductList, setPopularProductList] = useState([]);
  // const [loading, setLoading] = useState(false);

  // const fetchPopularProductHandler = async () => {
  //   const result = await axios.get('url');
  //   //반환=> [{name, imageurl, brandName, defaultPrice, salePrice },{},{}... 총 10개]
  //   if(result){
  //     setPopularProductList(result);
  //   }
  // }

  // useEffect(() => {
  //   setLoading(true);
  //   fetchPopularProductHandler();
  //   setLoading(false);
  // }, []);

  return (
    <>
      <HomeHeader />
      <div className={styles.container}>
        
        <div className={styles.ad}>
          <div className={styles.adContainer} ref={adContainerRef}>
            <div className={styles.adInner} ref={adInnerRef}>
              <img src="img/HomeAd1.png" /> 
            </div>
            <div className={styles.adInner}>
              <img src="img/HomeAd2.jpg" /> 
            </div>
            <div className={styles.adInner}>
              <img src="img/HomeAd3.jpg" /> 
            </div>
          </div>
        </div>

        <button className={styles.button1} ref={button1Ref} onClick={()=> {
          adContainerRef.current.style.transform = `translateX(-0)`;
        }}>1</button>
        <button className={styles.button2} ref={button2Ref} onClick={()=>{
          adContainerRef.current.style.transform = `translateX(-${adInnerRef.current.offsetWidth}px)`;
        }}>2</button>
        <button className={styles.button3} ref={button3Ref} onClick={()=>{
          adContainerRef.current.style.transform = `translateX(-${adInnerRef.current.offsetWidth * 2}px)`;
        }}>3</button>


        <div className={styles.bestContainer}>
          <div>인기 상품</div>
          <div className={styles.bestSlide}>
            <img className={styles.bestImg} src="img/main2_1.png"></img>
            <img className={styles.bestImg} src="img/main2_2.png"></img>
          </div>
        </div>

        {/* {popularProductList.map((item, index) => {
          return (
            <div>
                item
              </div>
          )
        })} */}
      </div>
      <Navbar />
    </>
  );

}
