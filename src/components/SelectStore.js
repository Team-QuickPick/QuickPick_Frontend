// SelectStore.js
import React from "react";
import styles from "./SelectStore.module.scss";

const SelectStore = ({ onStoreSelect }) => {
  const handleChange = (event) => {
    onStoreSelect(event.target.value);
  };

  return (
    <div className={styles.selectStoreWrapper}>
      <select onChange={handleChange}>
        <option value="">매장을 선택하세요</option>
        <option value="store1">강남점</option>
        <option value="store2">노원점</option>
        <option value="store3">홍대점</option>
        <option value="store4">상봉점</option>
      </select>
    </div>
  );
};

export default SelectStore;
