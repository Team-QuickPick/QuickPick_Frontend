import React from "react";
import styles from "./Search.module.scss";
import Navbar from "../components/Navbar";
import SearchHeader from "../components/SearchHeader";
import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import SelectStore from "../components/SelectStore";
import axios from "axios";

export default function Search() {
  // 매장 데이터
  const [stores, setStores] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/v1/stores/").then((response) => {
      const data = response.data;
      const stores = {};
      data.forEach((store, index) => {
        stores[`store${index + 1}`] = store.name;
      });
      setStores(stores);
    });
  }, []);

  const data = [
    {
      id: 1,
      name: "스킨",
      price: "10000",
      image:
        "https://image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0018/A00000018232405ko.jpg?l=ko",
      product_location: "올리브영 신사점",
    },
    {
      id: 2,
      name: "로션",
      price: "20000",
      image:
        "https://image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0018/A00000018232405ko.jpg?l=ko",
      product_location: "2",
    },
    {
      id: 3,
      name: "스킨2",
      price: "30000",
      image:
        "https://image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0018/A00000018053216ko.jpg?l=ko  ",
      product_location: "3",
    },
    {
      id: 4,
      name: "향수",
      price: "22000",
      image:
        "https://image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0013/A00000013906322ko.jpg?l=ko",
      product_location: "4",
    },
    {
      id: 5,
      name: "썬크림",
      price: "15000",
      image:
        "https://image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0016/A00000016321805ko.jpg?l=ko",
      product_location: "1",
    },

    {
      id: 6,
      name: "썬크림2",
      price: "10000",
      image:
        "https://image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0014/A00000014913523ko.jpg?l=ko",
      product_location: "2",
    },
  ];

  const [searchResults, setSearchResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedStore, setSelectedStore] = useState("");
  const [inputValue, setInputValue] = useState("");
  const handleStoreSelect = (selectedStoreKey) => {
    // 추가
    setSelectedStore(selectedStoreKey);
  };

  const handleSearch = (searchTerm) => {
    setInputValue(searchTerm);
    if (selectedStore === "") {
      alert("먼저 매장을 선택하세요.");
      return;
    }
    // 검색 결과 초기화
    setSearchResults([]);

    // 선택된 매장 이름 가져오기
    const selectedStoreName = stores[selectedStore];

    // 검색 기능 구현
    const results = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        item.product_location.includes(selectedStoreName)
    );

    setSearchResults(results);
    setSearchPerformed(true);
  };

  useEffect(() => {
    if (searchPerformed) {
      handleSearch(inputValue); // 매장을 변경할 때마다 현재 입력된 검색어로 검색을 수행합니다.
    }
  }, [selectedStore, searchPerformed]);

  // navbar의 search 아이콘 눌렀을 때 화면 초기화 시키기
  const [resetInput, setResetInput] = useState(false);

  const resetSearch = () => {
    setSearchResults([]);
    setSearchPerformed(false);
    setResetInput(true);
  };

  useEffect(() => {
    if (resetInput) {
      setResetInput(false);
    }
  }, [resetInput]);

  const getRandomArrayElement = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  // 중복 없이 랜덤한 배열 요소를 n개 반환하는 함수
  const getRandomArrayElements = (arr, n) => {
    const shuffledArray = [...arr].sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, n).map((item) => item.name);
  };

  const handleKeywordClick = (keyword) => {
    setInputValue(keyword); // 클릭된 키워드를 inputValue 상태에 저장
    handleSearch(keyword); // 클릭된 키워드로 검색 수행
  };

  return (
    <>
      <SearchHeader />
      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            <SelectStore onStoreSelect={handleStoreSelect} stores={stores} />
            <SearchBar onSearch={handleSearch} resetInput={resetInput} />
            {!searchPerformed ? (
              <div>
                <div className={styles.searchKeyword}>
                  <div className={styles.searchKeywordTitle}>최근 검색어</div>
                  <div className={styles.searchKeywordList}>
                    <div
                      className={styles.searchKeywordItem}
                      onClick={() =>
                        handleKeywordClick(getRandomArrayElement(data).name)
                      }
                    >
                      {getRandomArrayElement(data).name}
                    </div>
                  </div>
                </div>
                <div className={styles.searchKeyword}>
                  <div className={styles.searchKeywordTitle}>인기 검색어</div>
                  <div className={styles.searchKeywordList}>
                    {getRandomArrayElements(data, 1).map((name, index) => (
                      <div
                        key={index}
                        className={styles.searchKeywordItem}
                        onClick={() => handleKeywordClick(name)}
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : searchResults.length === 0 ? (
              <div>찾으시는 상품이 없습니다.</div>
            ) : (
              <>
                <div className={styles.searchResultText}>
                  총 {searchResults.length}건의 상품이 검색되었습니다.
                </div>
                <div className={styles.productsContainer}>
                  {searchResults.map((result, index) => (
                    <div key={index} className={styles.product}>
                      <img src={result.image} className={styles.image} />
                      <div className={styles.productInfo}>
                        <div>{result.name}</div>
                        <div>{result.price}</div>
                        <div>{result.product_location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Navbar onSearchIconClick={resetSearch} />
    </>
  );
}
