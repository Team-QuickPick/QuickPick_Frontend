import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./Recent.module.scss";
import Navbar from "../components/Navbar";
import RecentHeader from "../components/RecentHeader";

export default function Recent() {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem("recentProducts") || "[]");
    setRecentProducts(recent);
  }, []);

  return (
    <>
      <RecentHeader />
      <div className={styles.container}>
        <h2>최근 본 상품</h2>
        {recentProducts.length > 0 ? (
          <div className={styles.productList}>
            {recentProducts.map((product) => (
              <Link to={`/detail/${product.id}`} key={product.id}>
                <div className={styles.product}>
                  <img src={product.image} alt={product.name} />
                  <div className={styles.productInfo}>
                    <div className={styles.productName}>{product.name}</div>
                    <div className={styles.productPrice}>{product.price}원</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.noProducts}>최근 본 상품이 없습니다.</div>
        )}
      </div>
      <Navbar />
    </>
  );
}
