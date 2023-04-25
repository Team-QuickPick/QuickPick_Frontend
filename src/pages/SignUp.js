import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styles from "./SignUp.module.scss";
import DetailHeader from "../components/DetailHeader";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:8000/api/v1/users/signup/", {
        username,
        email,
        password,
      });

      // 회원가입 성공 후 로그인 페이지로 이동
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <DetailHeader />
      <div className={styles.signupContainer}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
          <button type="submit">Sign up</button>
        </form>
        <div className={styles.signupLogin}>
          <h4>
            이미 회원이신가요?🙆‍♀️
            <Link to="/login">Login</Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
