import balloon from "../assets/balloon.png";
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
      count: party.variation.range(30, 50),
    });
  };

  const initX = random(100, document.body.clientWidth - 350);
  const translateX = new Array(10).fill(0).map(() => random(-150, 250));
  const rotate = new Array(5).fill(0).map(() => random(-3, 3));
  const yDuration = random(4.5, 25);

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
              aspectRatio: "1/1.3",
            }}
            width={180}
            src={balloon}
            alt="balloon"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
