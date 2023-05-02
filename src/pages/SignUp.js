import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import styles from "./SignUp.module.scss";
import DetailHeader from "../components/DetailHeader";
import Navbar from "../components/Navbar";
import axiosInstance from "../utils/axiosConfig";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [showPasswordMatchMsg, setShowPasswordMatchMsg] = useState(false);
  const [showPasswordLengthMsg, setShowPasswordLengthMsg] = useState(false);

  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
    setPasswordMatch(password === e.target.value);
    setShowPasswordMatchMsg(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setShowPasswordLengthMsg(e.target.value.length < 8);
    setShowPasswordMatchMsg(false);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordMatch) {
      alert("비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    if (password.length < 8) {
      alert("비밀번호는 8글자 이상이어야 합니다.");
      return;
    }

    try {
      const response = await axiosInstance.post("/users/signup/", {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      console.error(error);

      if (error.response && error.response.data.email) {
        alert("이미 가입된 이메일 입니다.");
      }
    }
  };

  return (
    <div>
      <DetailHeader />
      <div className={styles.signupContainer}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="닉네임 입력"
              required
            />
          </div>
          <div>
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 입력"
              required
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호 8자리 이상 입력"
              required
            />
            {showPasswordLengthMsg && (
              <p>비밀번호는 8글자 이상이어야 합니다.</p>
            )}
          </div>
          <div>
            <label htmlFor="passwordConfirmation"></label>
            <input
              type="password"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={handlePasswordConfirmationChange}
              placeholder="다시 한번 입력해 주세요."
              required
            />
            {showPasswordMatchMsg && (
              <p>
                {passwordMatch
                  ? "비밀번호가 일치합니다."
                  : "비밀번호가 일치하지 않습니다."}
              </p>
            )}
          </div>

          <button type="submit">Sign up</button>
        </form>
        <div className={styles.signupLogin}>
          <h4>
            이미 회원이신가요?🙆‍♀️
            <Link to="/login">로그인 하러 가기</Link>
          </h4>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default SignUp;
