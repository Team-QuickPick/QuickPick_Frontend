import React, { useEffect, useState } from "react";
import ShareBtn from "./ShareBtn";

//kakao SDK
const KakaoShareBtn = () => {
  const [shareButton, setShareButton] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      setShareButton(true);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // return shareButton && <ShareBtn />;
};

export default KakaoShareBtn;
