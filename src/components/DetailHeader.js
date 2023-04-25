import { useLocation, useNavigate } from "react-router-dom";
import styles from "./DetailHeader.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const DetailHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1, { state: { ...location.state } });
  };

  return (
    <header className={styles.container}>
      <div className={styles.contents}>
        <div className={styles.icon}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={handleGoBack}
            size="lg"
            color="black"
          />
        </div>
      </div>

      
    </header>
  );
};

export default DetailHeader;
