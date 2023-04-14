import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProducts } from "../utils/fetchData";
import styles from "./Search.module.scss";
import Navbar from "../components/Navbar";
import SearchHeader from "../components/SearchHeader";
import SearchBar from "../components/SearchBar";
import Product from "../components/Product";

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = useCallback(async (searchTerm) => {
    const products = await fetchProducts();
    const filteredProducts = products.filter((product) =>
      product.name.includes(searchTerm)
    );
    setSearchResults(filteredProducts);
  }, []);

  return (
    <>
      <SearchHeader />

      <div className={styles.container}>
        <SearchBar onSearch={handleSearch} />
        <div className={styles.searchResultsCount}>
          {searchResults.length > 0
            ? `${searchResults.length}건의 상품이 검색되었습니다.`
            : null}
        </div>
        <div className={styles.productList}>
          {searchResults.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Navbar />
    </>
  );
}
