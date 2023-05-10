import React, { useEffect, useState } from "react";
import PatternDividerDesktop from "../assets/pattern-divider-desktop.svg";
import PatternDividerMobile from "../assets/pattern-divider-mobile.svg";
import IconDice from "../assets/icon-dice.svg";

const Advice = () => {
  const [advice, setAdvice] = useState({});
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  const fetchAdvice = () => {
    setLoading(true);
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((data) =>
        setAdvice({
          advice: data.slip.advice,
          adviceId: data.slip.id,
        })
      )
      .catch((error) => console.log(error))
      .finally(() => {
        setTimeout(() => setLoading(false), 800);
      });
  };

  const handleClick = () => {
    fetchAdvice();
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <div className="bg-DarkGrayishBlue relative flex flex-col justify-center items-center gap-8 p-10 pb-16 rounded-xl shadow-xl xs:w-[95%] sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-[30%]">
        <p className="font-Manrope text-NeonGreen text-sm tracking-[3px]">
          {advice.adviceId ? `ADVICE #${advice.adviceId}` : ""}
        </p>
        <h1 className="text-LightCyan font-Manrope text-3xl text-center xs:text-2xl">
          {loading ? "Loading..." : `"${advice.advice}"`}
        </h1>
        <img
          src={width > 576 ? PatternDividerDesktop : PatternDividerMobile}
          alt="PatternDivider"
        />
        <button
          className="absolute bottom-0 translate-y-1/2 bg-NeonGreen p-4 rounded-full dice__style"
          onClick={handleClick}
          disabled={loading}
        >
          <img src={IconDice} alt="IconDice" />
        </button>
      </div>
      <div className="font-Manrope text-LightCyan text-sm tracking-widest absolute bottom-64">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          className="text-NeonGreen"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a href="https://github.com/ervinpiol" className="text-NeonGreen">
          Ervin Vince Piol
        </a>
        .
      </div>
    </div>
  );
};

export default Advice;
