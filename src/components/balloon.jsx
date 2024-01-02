import purple from "../assets/purple.png";
import yellow from "../assets/yellow.png";
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
  const translateX = random(-250, 550, true);
  const yDuration = random(4.5, 25, true);

  const getRotate = () => {
    const number = random(0, 1, true).toFixed(1);

    if (number >= 0.7) {
      return 10;
    }

    if (number >= 0.3 && number < 0.7) {
      return 40;
    }

    return -15;
  };

  const getSrc = () => {
    const number = random(0, 1, true).toFixed(1);

    if (number >= 0.7) {
      return purple;
    }

    if (number >= 0.3 && number < 0.7) {
      return yellow;
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
              rotate: getRotate(),
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
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            },
            translateX: {
              duration: 10,
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
            }}
            width={100}
            src={getSrc()}
            alt="balloon"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
