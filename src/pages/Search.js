import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import styles from "./Search.module.scss";
import Navbar from "../components/Navbar";
import SearchHeader from "../components/SearchHeader";
import SearchBar from "../components/SearchBar";
import Product from "../components/Product";
import { fetchProducts, fetchStores } from "../utils/fetchData";
import RecentSearches from "../components/RecentSearches";

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);

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
    if (searchTerm.trim() === "") {
      // 검색어가 비어있을 경우
      alert("검색어를 입력해주세요.");
      return;
    }
    // 검색어가 입력된 경우
    const products = await fetchProducts();
    const stores = await fetchStores();
    const selectedStorePk = stores.find(
      (store) => store.name === selectedStore
    )?.pk;

    const filteredProducts = products.filter((product) => {
      const productName = product.name.toLowerCase();
      const searchTermLowerCase = searchTerm.toLowerCase();
      return (
        productName.includes(searchTermLowerCase) &&
        (selectedStorePk === "" ||
          product.product_location.includes(selectedStorePk))
      );
    });

    // Update localStorage with the recent search term
    const storedSearches = localStorage.getItem("recentSearches");
    let recentSearches = storedSearches ? JSON.parse(storedSearches) : [];
    recentSearches = [...new Set([searchTerm, ...recentSearches])].slice(0, 5);
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));

    setSearchResults(filteredProducts);
    setSearchPerformed(true);
  }, [searchTerm, selectedStore]);

  const resetSearch = useCallback(() => {
    setSearchResults([]);
    setSearchPerformed(false);
    setSearchTerm("");
    setSelectedStore("");
  }, []);

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
          ) : searchPerformed ? (
            <div className={styles.noResults}>찾으시는 상품이 없습니다.</div>
          ) : (
            <RecentSearches
              setSearchTerm={setSearchTerm}
              onSearchTermChange={handleSearchTermChange}
              onSearchButtonClick={handleSearch}
            />
          )}
        </div>
      </div>
      <Navbar onSearchIconClick={resetSearch} />
    </>
  );
}
