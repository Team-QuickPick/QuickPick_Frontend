import { useEffect } from "react";
import axios from "axios";

const Auth = () => {
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    async function fetchAccessToken() {
      try {
        const response = await axios.post("/api/token/", {
          grant_type: "authorization_code",
          client_id: process.env.REACT_APP_REST_API_KEY,
          redirect_uri: `http://127.0.0.1:3000/kakaoLogin`,
          code,
        });
        const { access_token } = response.data;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;
        await axios.post("/api/v1/users/kakaousers/", {
          access_token,
        });
        console.log("로그인이 완료되었습니다.");
      } catch (error) {
        console.log(error);
      }
    }

    if (code) {
      fetchAccessToken();
    }
  }, [code]);

  return <div>{code}</div>;
};

export default Auth;
