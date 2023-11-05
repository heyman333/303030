import balloon from "../assets/balloon.png";
import party from "party-js";
import React from "react";
import { random } from "lodash-es";

import { motion, AnimatePresence } from "framer-motion";

export const Balloon = () => {
  const balloonRef = React.useRef(null);
  const [visible, setVisible] = React.useState(true);

  const handleClick = () => {
    setVisible(false);
    party.confetti(balloonRef.current, {
      count: party.variation.range(30, 50),
    });
  };

  const initX = random(0, document.body.clientWidth - 100);
  const translateX = new Array(10).fill(0).map(() => random(-50, 50));
  const yDuration = random(10, 55);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="balloon"
          initial={{
            x: initX,
            opacity: 0,
            y: document.body.clientHeight + initX,
          }}
          animate={{
            opacity: 1,
            y: -document.body.clientHeight,
            translateX: translateX,
          }}
          transition={{
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
            delay: 1.5,
          }}
        >
          <motion.img
            ref={balloonRef}
            onClick={handleClick}
            style={{
              position: "absolute",
              aspectRatio: "1/1.3",
            }}
            width={150}
            src={balloon}
            alt="balloon"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
