"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AniCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "link">(
    "default"
  );
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!showCursor) setShowCursor(true);
    };

    const handleLinkHoverStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("hover-effect")) {
        setCursorText(target.getAttribute("data-cursor-text") || "View");
        setCursorVariant("link");
      }
    };

    const handleLinkHoverEnd = () => {
      setCursorText("");
      setCursorVariant("default");
    };

    window.addEventListener("mousemove", handleMouseMove);

    document.querySelectorAll(".hover-effect").forEach((element) => {
      element.addEventListener(
        "mouseenter",
        handleLinkHoverStart as EventListener
      );
      element.addEventListener(
        "mouseleave",
        handleLinkHoverEnd as EventListener
      );
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.querySelectorAll(".hover-effect").forEach((element) => {
        element.removeEventListener(
          "mouseenter",
          handleLinkHoverStart as EventListener
        );
        element.removeEventListener(
          "mouseleave",
          handleLinkHoverEnd as EventListener
        );
      });
     };
  }, [showCursor]);

  const cursorVariants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      width: "16px",
      height: "16px",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      fontSize: "0px",
    },
    link: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      width: "80px",
      height: "80px",
      backgroundColor: "rgba(255, 255, 255, 0.25)",
      fontSize: "14px",
    },
  };

  if (!showCursor) return null; // don't render anything until mouse moves

  return (
    <motion.div
      className="cursor grid place-content-center"
      variants={cursorVariants}
      animate={cursorVariant}
      transition={{
        ease: "easeOut",
        duration: 0.2,
      }}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        borderRadius: "50%",
        border: "2px solid white",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "difference",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontWeight: "bold",
      }}
    >
      {cursorText}
    </motion.div>
  );
};

export default AniCursor;
