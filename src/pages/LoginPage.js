import React from "react";
import LoginForm from "../services/LoginForm";

// import SignupForm from "./SignupForm"; // 회원가입 폼 컴포넌트를 가져옵니다.

const LoginPage = () => {
  return (
    <div>
      <h2>로그인</h2>
      <LoginForm />
      <h2>회원가입</h2>
      {/* <SignupForm /> 회원가입 폼을 추가합니다. */}
    </div>
  );
};

export default LoginPage;
