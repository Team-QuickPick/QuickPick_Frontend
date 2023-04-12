import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const DetailHeader = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  return (
    <header className={styles.container}>
      <div className={styles.contents}>
        <div>
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={handleGoBack}
            size="2x"
            color="white"
          />
        </div>
      </div>
    </header>
  );
};

export default DetailHeader;
