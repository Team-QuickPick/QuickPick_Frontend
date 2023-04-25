import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.scss";
import DetailHeader from "../components/DetailHeader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/users/login/",
        {
          email,
          password,
        }
      );
      const { refresh, access } = response.data;
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("access", access);
      console.log(response.data);

      // 로그인 성공 후 홈 페이지로 이동
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrorModalVisible(true);
    }
  };

  return (
    <div>
      <DetailHeader />
      <div className={styles.loginContainer}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <div className={styles.loginSignup}>
          <h4>
            회원이 아니신가요?🤔
            <Link to="/signup">Sign up</Link>
          </h4>
        </div>
      </div>
      {errorModalVisible && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>등록되지 않은 회원이거나 비밀번호가 일치하지 않습니다.</p>
            <button onClick={() => setErrorModalVisible(false)}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
