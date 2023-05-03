import React, { useState, useEffect } from "react";

import axiosInstance from "../utils/axiosConfig";
import styles from "./PopularSearches.module.scss";
import { Link } from "react-router-dom";

const PopularSearches = ({ onSearchTermChange, onSearchButtonClick }) => {
  const [popularSearches, setPopularSearches] = useState([]);

  useEffect(() => {
    const getPopularSearches = async () => {
      try {
        const response = await axiosInstance.get("/products/popular/");
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
            <Link
            to={`/detail/${product.id}`}
            style={{ textDecoration: "none" }}
            >
              <div 
              key={product.id} 
              className={styles.popularSearchItem}>
                {product.name}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div>인기 검색어가 없습니다.</div>
      )}
    </div>
  );
};

export default PopularSearches;
