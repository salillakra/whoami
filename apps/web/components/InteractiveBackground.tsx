"use client";
import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export function InteractiveBackground() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse following effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Use spring physics for smoother following
  const springX = useSpring(mouseX, { stiffness: 50, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update mouse position values
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Calculate mouse position as percentage of screen width/height
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-10 bg-[#121212] overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#121212]/95 to-[#121212]/90" />

      {/* Mouse following spotlight */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,107,0.8) 0%, rgba(26,26,46,0) 70%)",
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* First animated gradient */}
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] rounded-[40%] opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,107,0.5) 0%, rgba(26,26,46,0) 50%)",
        }}
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: {
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />

      {/* Second animated gradient */}
      <motion.div
        className="absolute -bottom-1/2 -right-1/2 w-[180%] h-[180%] rounded-[40%] opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,107,0.4) 0%, rgba(26,26,46,0) 50%)",
        }}
        animate={{
          rotate: -360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: {
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />

      {/* Third accent gradient for more depth */}
      <motion.div
        className="absolute top-1/4 -right-1/4 w-[120%] h-[120%] rounded-[30%] opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(130,87,229,0.3) 0%, rgba(26,26,46,0) 60%)",
        }}
        animate={{
          rotate: 180,
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          rotate: {
            duration: 45,
            repeat: Infinity,
            ease: "linear",
          },
          x: {
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          },
          y: {
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />
    </div>
  );
}
