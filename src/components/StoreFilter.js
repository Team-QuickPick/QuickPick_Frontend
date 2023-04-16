import React, { useEffect, useState } from "react";
import { fetchStores } from "../utils/fetchData";
import styles from "./StoreFilter.module.scss";

const StoreFilter = ({ onStoreSelect }) => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");

  useEffect(() => {
    async function getStores() {
      const storeData = await fetchStores();
      setStores(storeData);
    }
    getStores();
  }, []);

  const handleChange = (event) => {
    setSelectedStore(event.target.value);
    onStoreSelect(event.target.value);
  };

  return (
    <select
      className={styles.storeFilter}
      value={selectedStore}
      onChange={handleChange}
    >
      <option value="">매장을 선택하세요</option>
      {stores.map((store) => (
        <option key={store.pk} value={store.name}>
          {store.name}
        </option>
      ))}
    </select>
  );
};

export default StoreFilter;
