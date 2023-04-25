import React from "react";
import { Link } from "react-router-dom";

import styles from "./Product.module.scss";

export default function Product({ product }) {
  return (
    <Link
      to={`/detail/${product.id}`}
      key={product.id}
      style={{ textDecoration: "none" }}
    >
      <div key={product.id} className={styles.product}>
        <img src={product.image} className={styles.image} />
        <div className={styles.productInfo}>
          <div className={styles.name}>{product.name}</div>
          <div className={styles.price}>{product.price}원</div>
        </div>
      </div>
    </Link>
  );
}
