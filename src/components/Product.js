import React from "react";
import { Link } from "react-router-dom";

import styles from "./Product.module.scss";

export default function Product({ product }) {
  return (
    <Link to={`/detail/${product.id}`} key={product.id}>
      <div key={product.id} className={styles.product}>
        <img src={product.image} className={styles.image} />
        <div className={styles.productInfo}>
          <div>{product.name}</div>

          <div>{product.price}</div>
        </div>
      </div>
    </Link>
  );
}
