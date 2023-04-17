import axios from "axios";
import React, { useState, useEffect } from "react";

const KakaoLogin = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    const getToken = async (code) => {
      const response = await axios.post("https://kauth.kakao.com/oauth/token", {
        grant_type: "authorization_code",
        client_id: process.env.REACT_APP_REST_API_KEY,
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        code: code,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
      });
      setToken(response.data.access_token);
    };
    getToken(code);
  }, []);

  return <div>{token ? <p>Token: {token}</p> : <p>Loading...</p>}</div>;
};

export default KakaoLogin;
