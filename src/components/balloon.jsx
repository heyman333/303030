import red from "../assets/purple.png";
import gold from "../assets/gold.png";
import sky from "../assets/sky.png";

import party from "party-js";
import React from "react";
import { random } from "lodash-es";

import { motion, AnimatePresence } from "framer-motion";

export const Balloon = ({ controls }) => {
  const balloonRef = React.useRef(null);
  const [visible, setVisible] = React.useState(true);

  const handleClick = () => {
    setVisible(false);
    party.confetti(balloonRef.current, {
      count: party.variation.range(10, 15),
      shapes: ["star", "roundedSquare"],
      size: party.variation.range(0.5, 1),
    });
  };

  const initX = random(100, document.body.clientWidth - 350, true);
  const translateX = new Array(10).fill(0).map(() => random(-150, 250), true);
  const rotate = new Array(5).fill(0).map(() => random(-3, 3));
  const yDuration = random(4.5, 25, true);

  const getSrc = () => {
    const number = random(0, 1, true).toFixed(1);

    if (number >= 0.7) {
      return red;
    }

    if (number >= 0.3 && number < 0.7) {
      return gold;
    }

    return sky;
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="balloon"
          variants={{
            up: {
              opacity: 1,
              y: -document.body.clientHeight,
              translateX: translateX,
              rotate,
            },
          }}
          animate={controls}
          initial={{
            x: initX,
            opacity: 0,
            y: document.body.clientHeight + initX,
          }}
          transition={{
            rotate: {
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            },
            translateX: {
              duration: 100,
              repeat: Infinity,
              repeatType: "reverse",
            },
            opacity: { duration: 1 },
            scale: {
              duration: 1,
            },
            y: {
              duration: yDuration,
            },
          }}
        >
          <motion.img
            ref={balloonRef}
            onClick={handleClick}
            style={{
              userSelect: "none",
              position: "absolute",
              aspectRatio: "1/1.6",
            }}
            width={120}
            src={getSrc()}
            alt="balloon"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
