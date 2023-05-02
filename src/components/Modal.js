import React, { useEffect, useState } from "react";

import styles from "./Modal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../utils/axiosConfig";

const Modal = ({ showModal, setShowModal, renderItem }) => {
  const { pk, name, price, image, product_location } = renderItem;

  const [storeList, setStoreList] = useState([]);
  const [persistStoreList, setPersistStoreList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStoreHandler = async () => {
    try {
      const result = await axiosInstance.get("/stores/");
      if (result) {
        setStoreList(result.data);
        setLoading(false);
      }
    } catch (error) {
      console.log("올리브영 지점 데이터 조회 실패", error.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchStoreHandler();
    setLoading(false);
  }, []);

  useEffect(() => {
    if ("product_location" in renderItem) {
      const filterdArray = storeList.filter((store, index) =>
        product_location.includes(store.pk)
      );
      setPersistStoreList(filterdArray);
    }
  }, [renderItem]);

  return (
    <div className={showModal ? styles.modalBackdrop : styles.modalHidden}>
      <div className={styles.modalContent}>
        <img className={styles.img} src={image} />
        <div className={styles.name}>{name}</div>
        <div className={styles.price}>{price}원</div>
        <div>
          {persistStoreList.map((store, index) => {
            return (
              <div
                className={styles.stores}
                key={`${store.branch}${store.name}${index}`}
              >
                <div>{store.name}</div>
              </div>
            );
          })}
        </div>
        <button onClick={() => setShowModal(false)} className={styles.btn}>
          <FontAwesomeIcon icon={faXmark} size="lg" color="#3B28CC" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
