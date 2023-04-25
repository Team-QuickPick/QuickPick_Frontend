import styles from "./Modal.module.scss";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ showModal, setShowModal, renderItem }) => {
  const { pk, name, price, image, product_location } = renderItem;
  //ex) product_location = [1, 2];
  // storeList = [{pk: 1, name: '올리브영 오즈점', branch: '서울 서초구'}, {}, {}...]
  const [storeList, setStoreList] = useState([]);
  const [persistStoreList, setPersistStoreList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStoreHandler = async () => {
    try {
      const result = await axios.get("http://127.0.0.1:8000/api/v1/stores/");
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
      console.log("filterdArray-------", filterdArray);
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
                {/* <p>{store.branch}</p> */}
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
