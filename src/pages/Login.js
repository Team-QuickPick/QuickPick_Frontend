import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import styles from "./Login.module.scss";
import DetailHeader from "../components/DetailHeader";
import Navbar from "../components/Navbar";
import axiosInstance from "../utils/axiosConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("users/login/", {
        email,
        password,
      });
      const { refresh, access } = response.data;
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("access", access);
      // console.log(response.data);

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
          <h3 className={styles.title}>LOGIN</h3>
          <div>
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 입력"
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <div className={styles.loginSignup}>
          <h4>
            회원이 아니신가요?🤔
            <Link to="/signup">QuickPick 시작하기</Link>
          </h4>
        </div>
      </div>
      {errorModalVisible && (
        <>
          <div
            className={styles.modalOverlay}
            onClick={() => setErrorModalVisible(false)}
          />
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <p>등록되지 않은 회원이거나 비밀번호가 일치하지 않습니다.</p>
              <button onClick={() => setErrorModalVisible(false)}>확인</button>
            </div>
          </div>
        </>
      )}
      <Navbar />
    </div>
  );
};

export default Login;
