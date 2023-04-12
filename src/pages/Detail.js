import React from "react";
import styles from "./Home.module.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import DetailHeader from "../components/DetailHeader";
import Navbar from "../components/Navbar";

export default function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/v1/products/${id}`)
      .then((response) => {
        const productData = {
          id: response.data.pk,
          name: response.data.name,
          price: response.data.price,
          image: response.data.image,
        };
        setProduct(productData);
      });
  }, [id]);

  return (
    <>
      <DetailHeader />
      <div className={styles.container}>
        <div>
          <h1>상품 상세 정보</h1>
          {/* <img src={product.image} alt={product.name} /> */}
          <h2>{product.name}</h2>
          <h3>{product.price}</h3>
        </div>
      </div>
      <Navbar />
    </>
  );
}
