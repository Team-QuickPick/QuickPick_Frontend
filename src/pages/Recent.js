import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./Recent.module.scss";
import Navbar from "../components/Navbar";
import DetailHeader from "../components/DetailHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Recent() {
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRecentProducts() {
      const recent = JSON.parse(localStorage.getItem("recentProducts") || "[]");
      setRecentProducts(recent);
      setLoading(false);
    }
    getRecentProducts();
  }, []);

  if (loading) {
    return (
      <>
        <DetailHeader />
        <div className={styles.container}>Loading...</div>
        <Navbar />
      </>
    );
  }

  return (
    <>
      <DetailHeader />
      <div className={styles.container}>
        <h2>🔍 최근 본 상품 🔍</h2>
        {recentProducts.length > 0 ? (
          <div className={styles.productList}>
            {recentProducts.map((product) => (
              <Link
                to={{
                  pathname: `/detail/${product.id}`,
                  state: { product },
                }}
                key={product.id}
                style={{ textDecoration: "none" }}
              >
                <div className={styles.product}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                  />
                  <div className={styles.productInfo}>
                    <div className={styles.productName}>{product.name}</div>
                    <div className={styles.productPrice}>{product.price}원</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.noProducts}>
            최근 본 상품이 없습니다.
            <Link to="/search" className={styles.searchButton}>
              <FontAwesomeIcon icon={faSearch} />
              {" "}검색하러 가기
            </Link>
          </div>
        )}
      </div>
      <Navbar />
    </>
  );
}
