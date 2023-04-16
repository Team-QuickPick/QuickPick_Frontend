import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import styles from "./Search.module.scss";
import Navbar from "../components/Navbar";
import SearchHeader from "../components/SearchHeader";
import SearchBar from "../components/SearchBar";
import Product from "../components/Product";
import { fetchProducts, fetchStores } from "../utils/fetchData";

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleStoreSelect = useCallback(
    (storeName) => {
      setSelectedStore(storeName);
    },
    [setSelectedStore]
  );

  const handleSearchTermChange = useCallback(
    (term) => {
      setSearchTerm(term);
    },
    [setSearchTerm]
  );

  const handleSearch = useCallback(async () => {
    const products = await fetchProducts();
    const stores = await fetchStores();
    const selectedStorePk = stores.find(
      (store) => store.name === selectedStore
    )?.pk;

    const filteredProducts = products.filter((product) => {
      return (
        product.name.includes(searchTerm) &&
        product.product_location.includes(selectedStorePk)
      );
    });

    setSearchResults(filteredProducts);
  }, [searchTerm, selectedStore]);

  return (
    <>
      <SearchHeader />
      <div className={styles.container}>
        <SearchBar
          onStoreSelect={handleStoreSelect}
          onSearchTermChange={handleSearchTermChange}
          onSearchButtonClick={handleSearch} // Pass handleSearch function as a prop
        />
        <div className={styles.searchResultsCount}>
          {searchResults.length > 0
            ? `${searchResults.length}건의 상품이 검색되었습니다.`
            : null}
        </div>
        <div className={styles.productList}>
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <Product key={product.id} product={product} />
            ))
          ) : (
            <div className={styles.noResults}>찾으시는 상품이 없습니다.</div>
          )}
        </div>
      </div>
      <Navbar />
    </>
  );
}
