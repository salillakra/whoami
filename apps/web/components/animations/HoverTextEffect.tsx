"use client";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const HoverTextTranslateEffect = ({
  Text,
  staggerEffect = true,
  className,
}: {
  Text: string;
  staggerEffect?: boolean;
  className?: string;
}) => {
  const lineContainerVariants = {
    initial: {},
    animate: {},
    hover: {},
  };

  const lineOutVariants = {
    initial: { y: 0, opacity: 1 },
    animate: { y: 0, opacity: 1 },
    hover: { y: -40, opacity: 0 },
  };

  const lineInVariants = {
    initial: { y: 40, opacity: 0 },
    animate: { y: 40, opacity: 0 },
    hover: { y: 0, opacity: 1 },
  };

  const AnimationTime = {
    delay: staggerEffect ? 0.03 : 0,
    duration: 0.25,
  };

  return (
    <h1
      className={twMerge("text-center [word-spacing:0.09em]", className)}
      style={{
        lineHeight: "1.3",
      }}
    >
      {/* Top Line */}
      <motion.div
        key="first-line"
        className="overflow-hidden relative"
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={lineContainerVariants}
      >
        <div key="first-line-out" className="absolute inset-0">
          {Text.split("").map((char, index) => (
            <motion.span
              className="inline-block"
              variants={lineOutVariants}
              transition={{
                delay: staggerEffect ? index * AnimationTime.delay : 0,
                duration: AnimationTime.duration,
                ease: "anticipate",
              }}
              key={index}
            >
              {char}
            </motion.span>
          ))}
        </div>
        <div key="first-line-in">
          {Text.split("").map((char, index) => (
            <motion.span
              className="inline-block"
              variants={lineInVariants}
              key={index}
              transition={{
                delay: staggerEffect ? index * AnimationTime.delay : 0,
                duration: AnimationTime.duration,
                ease: "anticipate",
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </h1>
  );
};

export default HoverTextTranslateEffect;
