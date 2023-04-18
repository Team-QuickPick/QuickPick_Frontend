import React from "react";

const Auth = () => {
  // 현재 윈도우 창의 주소값을 불러옴
  // 현재 url의 파라미터를 가져옴
  // params에 저장된 파라미터 안에서 'code'의 값을 가져옴
  const code = new URL(window.location.href).searchParams.get("code");
  return <div>{code}</div>;
};

export default Auth;
