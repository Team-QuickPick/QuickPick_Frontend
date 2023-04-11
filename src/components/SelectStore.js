import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./SelectStore.module.scss";

const SelectStore = ({ onStoreSelect }) => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/stores/");
      const data = response.data;
      const stores = data.reduce((acc, store, index) => {
        acc[store.pk] = store.name;
        return acc;
      }, {});
      setStores(stores);
      console.log(stores);
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    onStoreSelect(event.target.value);
  };

  return (
    <div className={styles.selectStoreWrapper}>
      <select onChange={handleChange}>
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
