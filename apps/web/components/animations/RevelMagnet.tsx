"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import { twMerge } from "tailwind-merge";

const RevelMagnet = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scope, animate] = useAnimate();
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // 🔄 Set center coordinates relative to viewport
  const updateCenter = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCenter({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  };

  useEffect(() => {
    updateCenter(); // Initial run

    window.addEventListener("resize", updateCenter);
    window.addEventListener("scroll", updateCenter, true); // Update on scroll

    return () => {
      window.removeEventListener("resize", updateCenter);
      window.removeEventListener("scroll", updateCenter, true);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
    updateCenter(); // Recalculate on hover entry (DOM might have moved)
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    animate(scope.current, { x: 0, y: 0 }, { duration: 0.4, ease: "easeOut" });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isHovering) return;

    const strength = 10;
    const offsetX = (e.clientX - center.x) / strength;
    const offsetY = (e.clientY - center.y) / strength;

    animate(
      scope.current,
      { x: offsetX, y: offsetY },
      { duration: 0.2, ease: "easeOut" }
    );
  };

  return (
    <motion.div
      {...props}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={twMerge(
        "relative overflow-hidden p-2 cursor-pointer select-none",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div
        ref={scope}
        className="inline-block transition-transform duration-200 ease-out"
      >
        <span>{children}</span>
      </div>
    </motion.div>
  );
};

export default RevelMagnet;
