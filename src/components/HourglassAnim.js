import React, { useEffect } from "react";
import { useLottie } from "lottie-react";
import countDownAnimation from "../assets/countdown.json";

const CountDown = ({ isActive }) => {
  const options = {
    animationData: countDownAnimation,
    loop: true,
    autoplay: false,
    rendererSettings: {
      width: 40,
      height: 50
    }
  };

  const { View, play, stop } = useLottie(options);

  useEffect(() => {
    if (isActive)
      play();
    else
      stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive])

  return <>{View}</>;
};

export default CountDown;