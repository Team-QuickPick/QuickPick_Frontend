import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import axios from "axios";
import DetailHeader from "../components/DetailHeader";
import Navbar from "../components/Navbar";
import styles from "./Detail.module.scss";

export default function Detail() {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || {});
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  

  useEffect(() => {
    console.log('id--------------------',id)
    console.log('location--------------------',location)
    console.log('------------------',product);
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
          category: response.data.product_category,
          number: response.data.product_number,
          categoryimage: response.data.product_number[0],
        };
        setProduct(productData);

        // Get recommended products with the same category
        const recommendedResponse = await axios.get(
          // `http://127.0.0.1:8000/api/v1/products?category=${productData.category}&limit=6`
          `http://127.0.0.1:8000/api/v1/products/`
        );
        const recommendedProducts = recommendedResponse.data.slice(0,6);
        setRecommendedProducts(recommendedProducts);


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
          <h3 className={styles.productCategory}>{product.category}</h3>
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

        {recommendedProducts.length > 0 && (
          <div className={styles.recommended}>
            <h3>추천 상품</h3>
            <div className={styles.products}>
              {recommendedProducts.map((product) => (
                <div key={product.id} className={styles.product}>
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <h3>{product.price}원</h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Navbar />
    </>
  );
}
