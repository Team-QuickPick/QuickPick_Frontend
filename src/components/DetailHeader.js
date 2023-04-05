import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

const DetailHeader = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <header className={styles.container}>
      <div className={styles.contents}>
        <div>
          <button onClick={handleGoBack}>back</button>
        </div>
      </div>
    </header>
  );
};

export default DetailHeader;
