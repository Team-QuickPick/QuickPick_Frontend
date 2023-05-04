import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import styles from "./Detail.module.scss";

import axiosInstance from "../utils/axiosConfig";
import DetailHeader from "../components/DetailHeader";
import Navbar from "../components/Navbar";
import ShareBtn from "../components/ShareBtn";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Detail() {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || {});
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    async function getProductData() {
      try {
        const response = await axiosInstance.get(`products/${id}`);
        const productData = {
          id: response.data.id,
          name: response.data.name,
          price: response.data.price,
          image: response.data.image,
          product_category: response.data.product_category,
          number: response.data.product_number,
          categoryimage: response.data.product_number[0],
        };
        setProduct(productData);

        // 검색 결과와 같은 카테고리 상품 가져오기
        const recommendedResponse = await axiosInstance.get(
          `products/${response.data.product_category}`
        );
        // 위의 상품과 중복되지 않게 랜덤으로 15개 가져오기
        if (recommendedResponse.data) {
          const recommendedProducts = recommendedResponse.data.filter(
            (product) => product.id !== productData.id
          );
          const shuffledProducts = recommendedProducts.sort(
            () => 0.5 - Math.random()
          );
          const recommendedProductsSubset = shuffledProducts.slice(0, 15);

          setRecommendedProducts(recommendedProductsSubset);
        }

        // 클릭한 상품 정보를 localStorage에 저장
        const recentProducts = JSON.parse(
          localStorage.getItem("recentProducts") || "[]"
        );
        const clickedProduct = {
          id: productData.id,
          name: productData.name,
          price: productData.price,
          image: productData.image,
        };
        const existingProductIndex = recentProducts.findIndex(
          (product) => product.id === clickedProduct.id
        );

        if (existingProductIndex !== -1) {
          recentProducts.splice(existingProductIndex, 1);
        }

        localStorage.setItem(
          "recentProducts",
          JSON.stringify([clickedProduct, ...recentProducts])
        );
      } catch (error) {
        console.error(error);
        alert("상품 정보를 가져오는 중 오류가 발생했습니다.");
      }
    }
    if (!product.id) {
      getProductData();
    }
  }, [id, product.id]);

  return (
    <>
      <DetailHeader />
      <div className={styles.container}>
        {/* 검색 결과 */}
        <div className={styles.product}>
          <h2 className={styles.productCategory}>
            💎 {product.product_category} 💎
          </h2>
          <img
            className={styles.categoryImg}
            src={`/img/detail/${product.categoryimage}.png`}
            alt="category image"
          />
          <img
            className={styles.productImg}
            src={product.image}
            alt="product image"
          />
          <h3 className={styles.productName}>{product.name}</h3>
          <h3 className={styles.productPrice}>{product.price}원</h3>
        </div>

        {/* 추천 상품 자동 슬라이드 */}
        <h3>🎁 같이 찾으시는 상품 🎁</h3>
        <Slider
          dots={false}
          slidesToShow={2.5}
          slidesToScroll={1}
          initialSlide={7.5}
          autoplay={false}
          draggable={true} // 드래그
          touchMove={true} // 터치 이동
          swipeToSlide={true} // 스와이프 슬라이드 이동
          infinite={true}
          className={styles.recommendSlider}
        >
          {recommendedProducts.map((recommendProduct) => {
            return (
              <div>
                <Link
                  to={`/detail/${recommendProduct.id}`}
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    window.location.href = recommendProduct.id;
                  }}
                  key={recommendProduct.id}
                  className={styles.recommendBox}
                >
                  <div
                    key={recommendProduct.id}
                    style={{ margin: "5px", cursor: "pointer" }}
                    className={styles.recommendItems}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={recommendProduct.image}
                      alt={recommendProduct.name}
                      style={{ width: 150, height: 150 }}
                    />
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "black",
                        height: "4rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "5px",
                      }}
                    >
                      {recommendProduct.name}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "orangered" }}>
                      {recommendProduct.price}원
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>

        {/* 공유하기 */}
        <ShareBtn />
      </div>
      <Navbar />
    </>
  );
}
