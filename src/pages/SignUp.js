import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styles from "./SignUp.module.scss";
import DetailHeader from "../components/DetailHeader";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [showPasswordMatchMsg, setShowPasswordMatchMsg] = useState(false);
  const [showPasswordLengthMsg, setShowPasswordLengthMsg] = useState(false);

  const handlePasswordMatch = (confirmation) => {
    return password === confirmation;
  };

  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
    setPasswordMatch(handlePasswordMatch(e.target.value));
    setShowPasswordMatchMsg(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setShowPasswordLengthMsg(e.target.value.length < 8);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordMatch) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    if (password.length < 8) {
      alert("비밀번호는 8글자 이상이어야 합니다.");
      return;
    }

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
              onChange={handlePasswordChange}
            />
            {showPasswordLengthMsg && (
              <p>비밀번호는 8글자 이상이어야 합니다.</p>
            )}
          </div>
          <div>
            <label htmlFor="passwordConfirmation">Confirm Password:</label>
            <input
              type="password"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={handlePasswordConfirmationChange}
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
            <Link to="/login">Login</Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
