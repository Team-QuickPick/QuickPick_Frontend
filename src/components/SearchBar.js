import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { fetchStores } from "../utils/fetchData";
import styles from "./SearchBar.module.scss";

const SearchBar = ({
  onStoreSelect,
  onSearchTermChange,
  onSearchButtonClick,
  resetInput,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");

  useEffect(() => {
    async function getStores() {
      const fetchedStores = await fetchStores();
      setStores(fetchedStores);
    }
    getStores();
  }, []);

  useEffect(() => {
    if (resetInput) {
      setSearchTerm("");
    }
  }, [resetInput]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearchTermChange(event.target.value);
  };

  const handleStoreChange = (event) => {
    setSelectedStore(event.target.value);
    onStoreSelect(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSearchButtonClick();
  };

  return (
    <div className={styles.searchBarWrapper}>
      <form onSubmit={handleFormSubmit}>
        <select value={selectedStore} onChange={handleStoreChange}>
          <option value="">Select a store</option>
          {stores.map((store) => (
            <option key={store.pk} value={store.name}>
              {store.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;

Modal.setAppElement("#root"); // 앱 루트 요소 설정 (React
