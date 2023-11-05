import "./App.css";
import React, { useEffect } from "react";
import party from "party-js";
import { EnhancedAnimatedNumber } from "./components";
import { motion, useAnimation } from "framer-motion";

import { Balloon } from "./components";

function App() {
  const controls = useAnimation();
  const confettiRef = React.useRef(null);
  const handleOnAnimationStart = () => {
    setTimeout(() => {
      party.confetti(party.Rect.fromScreen(), {
        count: party.variation.range(140, 250),
      });
    }, 2000);
  };

  useEffect(() => {
    const handleOnClick = () => {
      const targets = document.querySelectorAll("#balloon");
      if (targets.length === 1) {
        alert("축하합니다!, 풍선을 다 터트렸으니 행복한일만 가득할거에요!");
      }
    };

    window.addEventListener("click", handleOnClick);

    return () => window.removeEventListener("click", handleOnClick);
  }, []);

  return (
    <motion.div
      style={{
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        backgroundColor: "#000",
        overflow: "hidden",
      }}
      animate={{
        backgroundColor: "#00000087",
      }}
      onAnimationComplete={() => controls.start("up")}
      transition={{
        backgroundColor: {
          delay: 2.3,
        },
      }}
    >
      <motion.div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "absolute",
          top: "40%",
          left: 0,
          width: "100%",
        }}
        layout
        animate={{
          top: 30,
          position: "absolute",
          width: "100%",
        }}
        transition={{
          type: "spring",
          bounce: 0.68,
          delay: 2,
          duration: 5,
        }}
      >
        <EnhancedAnimatedNumber animateToNumber={30} />
        <motion.div
          className="title"
          style={{
            fontSize: Math.ceil(document.body.clientWidth / 16.5),
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onAnimationStart={handleOnAnimationStart}
          transition={{
            type: "spring",
            delay: 1.5,
          }}
        >
          창원걸스의 30대를 축하합니다 <span ref={confettiRef}>🎉</span>
        </motion.div>
      </motion.div>
      {new Array(30).fill(0).map((_, idx) => (
        <Balloon key={idx} controls={controls} />
      ))}
    </motion.div>
  );
}

export default App;
