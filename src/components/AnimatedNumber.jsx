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
  const animateToNumbersArr = Array.from(`${animateToNumber}`, Number);

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
                    damping: index + 9,
                  },
                }}
                initial={{ y: -100 }}
                animate={{
                  y: -1 * (LINE_HEIGHT * n) - LINE_HEIGHT * 20,
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
