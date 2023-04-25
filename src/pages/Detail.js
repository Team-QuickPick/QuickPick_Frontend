import React from "react";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import axios from "axios";
import DetailHeader from "../components/DetailHeader";
import Navbar from "../components/Navbar";
import styles from "./Detail.module.scss";

export default function Detail() {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || {});

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
          category: response.data.product_category,
          number: response.data.product_number,
          categoryimage: response.data.product_number[0],
        };
        setProduct(productData);

        // 클릭한 상품 정보를 localStorage에 저장
        const recentProducts = JSON.parse(
          localStorage.getItem("recentProducts") || "[]"
        );
        const clickedProduct = {
          name: productData.name,
          price: productData.price,
          image: productData.image,
        };
        localStorage.setItem(
          "recentProducts",
          JSON.stringify([...new Set([clickedProduct, ...recentProducts])])
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
        <div className={styles.product}>
          <img
            className={styles.productImg}
            src={product.image}
            alt="product image"
          />

          <img
            className={styles.categoryImg}
            src={`/img/detail/${product.categoryimage}.png`}
            alt="category image"
          />

          <h3 className={styles.productName}>{product.name}</h3>
          <h3 className={styles.productPrice}>{product.price}원</h3>
          <h3 className={styles.productCategory}>{product.category}</h3>
        </div>
      </div>
      <Navbar />
    </>
  );
}
