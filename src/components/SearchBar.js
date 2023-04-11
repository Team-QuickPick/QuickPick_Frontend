import React, { useState } from "react";
import Modal from "react-modal";
import { useEffect } from "react";
import styles from "./SearchBar.module.scss";

const SearchBar = ({ onSearch, resetInput }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (resetInput) {
      setSearchTerm("");
    }
  }, [resetInput]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim().length === 0) {
      setIsModalOpen(true);
    } else {
      onSearch(searchTerm);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.searchBarWrapper}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">검색</button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="경고창"
      >
        <div>공백을 제외하고 한 글자 이상으로 입력해주세요.</div>
        <div style={{ textAlign: "center" }}>
          <button onClick={closeModal} className={styles.modalButton}>
            확인
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SearchBar;

// 모달 스타일 지정
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    // marginBottom: "10px",
    transform: "translate(-50%, -50%)",
    // display: "flex",

    // justifyContent: "center",
    // alignItems: "center",
  },
  button: {
    marginTop: "20px",
  },
};

Modal.setAppElement("#root"); // 앱 루트 요소 설정 (React 앱에서 일반적으로 'root' div의 ID)
