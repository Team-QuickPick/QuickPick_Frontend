import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./SelectStore.module.scss";

const SelectStore = ({ onStoreSelected }) => {
  const [stores, setStores] = useState([]);

  const handleStoreSelect = (event) => {
    const storeId = event.target.value;
    if (storeId) {
      onStoreSelected(storeId);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/stores/");
      const data = response.data;
      const stores = data.reduce((acc, store, index) => {
        acc[store.pk] = store.name;
        return acc;
      }, {});
      setStores(stores);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.selectStoreWrapper}>
      <select onChange={handleStoreSelect}>
        <option value="">매장을 선택하세요</option>
        {Object.entries(stores).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectStore;
