function loginWithKakao() {
  const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URI}`;
  const CLIENT_ID = `${process.env.REACT_APP_CLIENT_SECRET}`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  window.location.href = KAKAO_AUTH_URL;
}
