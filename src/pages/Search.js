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
  const [products, setProducts] = useState([]); // products 변수 선언

  const [searchResults, setSearchResults] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleStoreSelect = useCallback((storeName) => {
    setSelectedStore(storeName);
  }, []);

  const handleSearchTermChange = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleSearch = useCallback(async () => {
    if (searchTerm.trim() === "") {
      alert("검색어를 입력해주세요.");
      return;
    }

    try {
      const fetchedProducts = await fetchProducts();
      const stores = await fetchStores();
      const selectedStorePk = stores.find(
        (store) => store.name === selectedStore
      )?.pk;

      const filteredProducts = fetchedProducts.filter((product) => {
        const productName = product.name.toLowerCase();
        const searchTermLowerCase = searchTerm.toLowerCase();
        return (
          productName.includes(searchTermLowerCase) &&
          (selectedStorePk === "" ||
            product.product_location.includes(selectedStorePk))
        );
      });

      const recentSearches = JSON.parse(
        localStorage.getItem("recentSearches") || "[]"
      );
      localStorage.setItem(
        "recentSearches",
        JSON.stringify(
          [...new Set([searchTerm, ...recentSearches])].slice(0, 5)
        )
      );

      setProducts(fetchedProducts); // products 변수에 값을 할당
      setSearchResults(filteredProducts);
      setSearchPerformed(true);
    } catch (error) {
      console.error(error);
      alert("상품 정보를 가져오는 중 오류가 발생했습니다.");
    }
  }, [searchTerm, selectedStore]);

  const resetSearch = useCallback(() => {
    setSelectedStore("");
    setSearchTerm("");
    setSearchPerformed(false);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("recentSearches") === null) {
      localStorage.setItem("recentSearches", JSON.stringify([]));
    }
  }, []);
  return (
    <>
      <SearchHeader />
      <div className={styles.container}>
        <SearchBar
          onStoreSelect={handleStoreSelect}
          onSearchTermChange={handleSearchTermChange}
          onSearchButtonClick={handleSearch}
          onResetSearch={resetSearch} // Pass resetSearch function as a prop
          selectedStore={selectedStore} // Pass selectedStore as a prop
          searchTerm={searchTerm} // Pass searchTerm as a prop
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
