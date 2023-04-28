// PopularSearches.js
import React, { useState, useEffect } from "react";

import axios from "axios";
import styles from "./PopularSearches.module.scss";

const PopularSearches = ({ onSearchTermChange, onSearchButtonClick }) => {
  const [popularSearches, setPopularSearches] = useState([]);

  useEffect(() => {
    const getPopularSearches = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/products/popular/"
        );
        setPopularSearches(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getPopularSearches();
  }, []);

  return (
    <div className={styles.container}>
      <h4>🔥QuickPick's 실시간 랭킹🔥</h4>
      {popularSearches.length > 0 ? (
        <div className={styles.popularSearchesContainer}>
          {popularSearches.map((product) => (
            <div key={product.id} className={styles.popularSearchItem}>
              {product.name}
            </div>
          ))}
        </div>
      ) : (
        <div>인기 검색어가 없습니다.</div>
      )}
    </div>
  );
};

export default PopularSearches;
