import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./Detail.module.scss";

import axios from "axios";
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
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/products/${id}`
          );
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
        const recommendedResponse = await axios.get(
          `http://127.0.0.1:8000/api/v1/products/${response.data.product_category}`
          );
        // 랜덤으로 중복되지 않게 6개 가져오기
        if(recommendedResponse.data){
          const recommendedProducts = recommendedResponse.data.filter(product => product.id !== productData.id);
          const shuffledProducts = recommendedProducts.sort(() => 0.5 - Math.random());
          const recommendedProductsSubset = shuffledProducts.slice(0, 6);
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
          <h3 className={styles.productCategory}>{product.product_category}</h3>
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
        <Slider dots={false} slidesToShow={2} slidesToScroll={2} autoplay={true} autoplaySpeed={2500}>
          {recommendedProducts.map(product => (
            <div key={product.id}>
              <div className={styles.recommendBox}>
                <div key={product.id} className={styles.recommendedItems}>
                  <img className={styles.recommendImg} src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <h3>{product.price}원</h3>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        
        {/* 공유하기 */}
        <ShareBtn />
      </div>
      <Navbar />
    </>
  );
}
