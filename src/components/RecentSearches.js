import { useState, useEffect } from "react";
import styles from "./RecentSearches.module.scss"; // Import the SCSS module

const RecentSearches = ({
  setSearchTerm,
  onSearchTermChange,
  onSearchButtonClick,
}) => {
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  const handleRecentSearchClick = (searchTerm) => {
    setSearchTerm(searchTerm);
    onSearchTermChange(searchTerm);
    onSearchButtonClick();
  };

  return (
    <div>
      <h2>최근 검색어</h2>
      {recentSearches.length > 0 ? (
        <div className={styles.recentSearchesContainer}>
          {recentSearches.slice(0, 5).map((searchTerm) => (
            <div key={searchTerm} className={styles.recentSearchItem}>
              {searchTerm}
            </div>
          ))}
        </div>
      ) : (
        <div>최근 검색어가 없습니다.</div>
      )}
    </div>
  );
};

export default RecentSearches;
