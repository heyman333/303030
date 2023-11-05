import React from "react";
import { motion } from "framer-motion";

const NUMBERS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5,
  6, 7, 8, 9,
];

// 패딩값 + 10
const LINE_HEIGHT = 100;

// lib
const AnimatedNumber = ({ animateToNumber }) => {
  const animteTonumberString =
    Math.abs(animateToNumber).toLocaleString("ko-KR");
  const animateToNumbersArr = Array.from(animteTonumberString, Number).map(
    (x, idx) => (isNaN(x) ? animteTonumberString[idx] : x)
  );

  return (
    <div className="container">
      {animateToNumbersArr.map((n, index) => {
        return (
          <div
            key={index}
            style={{
              height: LINE_HEIGHT,
              overflow: "hidden",
            }}
          >
            {NUMBERS.map((number, i) => (
              <motion.span
                className="animated-number"
                key={i}
                transition={{
                  y: {
                    type: "spring",
                    stiffness: 30,
                    damping: 10,
                  },
                  opacity: {
                    duration: 1,
                  },
                }}
                initial={{ y: index === 0 ? -100 : 0, opacity: 1 }}
                animate={{
                  opacity: index === 0 ? (i < 3 ? 0 : 1) : i < 17 ? 0 : 1,
                  y:
                    -1 * (LINE_HEIGHT * animateToNumbersArr[index]) -
                    LINE_HEIGHT * 20 * index,
                }}
              >
                {number}
              </motion.span>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export const EnhancedAnimatedNumber = React.memo(
  AnimatedNumber,
  (prevProps, nextProps) => {
    return prevProps.animateToNumber === nextProps.animateToNumber;
  }
);
