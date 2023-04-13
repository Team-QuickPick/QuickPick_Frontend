import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import styles from "./Home.module.scss";
import DetailHeader from "../components/DetailHeader";

export default function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/v1/products/${id}`)
      .then((response) => {
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
        console.log(productData);
      });
  }, [id]);

  return (
    <>
      <DetailHeader />
      <div className={styles.container}>
        <div>
          <h1>상품 상세 정보</h1>
          <img src={product.image} alt={product.name} />

          <img
            src={`/img/detail/${product.categoryimage}.png`}
            alt={product.categoryimage}
          />
          <h2>{product.name}</h2>
          <h3>{product.price}</h3>
          <h3>{product.category}</h3>
          <h3>{product.number}</h3>
        </div>
      </div>
      <Navbar />
    </>
  );
}
