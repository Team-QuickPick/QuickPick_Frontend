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
        // console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    getPopularSearches();
  }, []);

  const handlePopularSearchClick = (searchTerm) => {
    onSearchTermChange(searchTerm);
    onSearchButtonClick();
  };

  return (
    <div className={styles.container}>
      <h4>인기 검색어</h4>
      {popularSearches.length > 0 ? (
        <div className={styles.popularSearchesContainer}>
          {popularSearches.map((product) => (
            <div
              key={product.id}
              className={styles.popularSearchItem}
              //   onClick={() => handlePopularSearchClick(product.name)}
            >
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
