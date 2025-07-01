"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const languages = [
  { text: "Hello", lang: "English" },
  { text: "Hola", lang: "Spanish" },
  { text: "Bonjour", lang: "French" },
  { text: "Ciao", lang: "Italian" },
  { text: "こんにちは", lang: "Japanese" },
  { text: "안녕하세요", lang: "Korean" },
  { text: "Привет", lang: "Russian" },
  { text: "नमस्ते", lang: "Hindi" },
];

const Hero = () => {
  const [currentLangIndex, setCurrentLangIndex] = useState(0);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLangIndex((prev) => (prev + 1) % languages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []); // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const greetingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 90,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden pt-20">
      <div className="container mx-auto px-4 py-16 flex flex-col items-start justify-center min-h-[calc(100vh-5rem)] relative z-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl text-white"
        >
          <div className="overflow-hidden mb-6 h-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={languages[currentLangIndex]?.text}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex items-center space-x-2 hover-effect"
                data-cursor-text={languages[currentLangIndex]?.lang || ""}
              >
                <span className="text-3xl md:text-4xl font-light text-accent">
                  {languages[currentLangIndex]?.text || ""}
                </span>
                <span className="text-sm uppercase tracking-wider text-foreground/60 font-mono mt-1.5">
                  [{languages[currentLangIndex]?.lang || ""}]
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              variants={childVariants}
              className="text-5xl md:text-7xl pb-2 lg:text-8xl font-bold tracking-tight hover-effect text-white"
              data-cursor-text="Creative"
            >
              <span className="inline-block text-foreground">
                I Create <span className="text-accent">Digital</span>
              </span>
              <br />
              <span className="inline-block text-foreground">
                <span className="text-accent">Experiences</span> That
              </span>
              <br />
              <span className="inline-block text-foreground">
                Inspire & Engage
              </span>
            </motion.h1>
          </div>

          <motion.p
            variants={childVariants}
            className="mt-6 md:mt-8 text-base md:text-lg max-w-2xl text-white/80 backdrop-blur-sm bg-background/10 p-4 rounded-lg"
          >
            Full-stack developer & digital artist passionate about crafting
            immersive web experiences that merge cutting-edge technology with
            stunning design.
          </motion.p>

          <motion.div
            variants={childVariants}
            className="mt-8 md:mt-12 flex flex-wrap gap-4"
          >
            <motion.a
              href="#projects"
              className="group relative inline-flex items-center justify-center px-8 py-3 font-medium tracking-wide text-background bg-accent rounded-full overflow-hidden hover-effect shadow-lg shadow-accent/20"
              data-cursor-text="View"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 text-foreground">
                View My Work
              </span>
              <motion.span
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%", opacity: 0.7 }}
                whileHover={{ x: "100%", opacity: 0.2 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </motion.a>

            <motion.a
              href="#contact"
              className="group relative inline-flex items-center justify-center px-8 py-3 font-medium tracking-wide text-white border border-white/20 rounded-full overflow-hidden hover-effect backdrop-blur-sm bg-white/5"
              data-cursor-text="Contact"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Let's Connect</span>
              <motion.span
                className="absolute inset-0 bg-accent/10"
                initial={{ y: "100%", opacity: 0 }}
                whileHover={{ y: "0%", opacity: 0.5 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-xs uppercase tracking-widest mb-2 opacity-60 text-white">
            Scroll Down
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-accent" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
