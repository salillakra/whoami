"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import LiLsaImg from "@/assets/lilsa.png";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
    },
  },
};

// Content Data
const bioContent = {
  title: "Full-Stack Developer & ML Enthusiast",
  subtitle: "Designing intelligent systems with purpose and polish",
  paragraphs: [
    {
      highlight: ["passionate full-stack developer", "machine learning"],
      content:
        "I'm a {0} with a deep curiosity for {1}. I love blending logic with creativity — building thoughtful, end-to-end solutions that are not only smart but visually compelling. Whether it's crafting seamless interfaces or architecting data-driven systems, I aim to make every layer count.",
    },
    {
      highlight: [`${new Date().getFullYear() - 2021}+ years`],
      content:
        "For over {0}, I’ve been building digital experiences that bridge the front-end and the back-end — and often, the model behind it. My projects have spanned responsive interfaces, predictive analytics, and real-time applications — always grounded in usability and clarity.",
    },
    {
      highlight: ["AI and human creativity"],
      content:
        "What excites me most is the space where {0} meet. When I’m not building products, I’m experimenting with neural nets, contributing to open source, or exploring new ways ML can amplify creative work. To me, tech should elevate people — not replace them.",
    },
  ],
};

const personalityCards = [
  {
    id: 1,
    title: "How I Think",
    highlight: ["analytical problem-solving"],
    content:
      "I combine {0} with creative instinct. Much like the models I build, I spot patterns, adapt quickly, and keep evolving. I enjoy breaking down complex ideas and rebuilding them into practical, elegant solutions — especially when I can bridge the gap between data and real-world applications.",
    pattern: "hexagon",
  },
  {
    id: 2,
    title: "How I Work",
    highlight: ["intersection of code and data"],
    content:
      "I thrive at the {0}, where logic meets creativity. My workflow is iterative — I build, test, and improve, just like training a neural network. I believe in planning with structure, but I’m always ready to pivot when new insights or unexpected signals appear.",
    pattern: "circles",
  },
  {
    id: 3,
    title: "My Values",
    highlight: ["intelligent and ethical"],
    content:
      "I care about building technology that's not just {0}, but also responsible. I stand for transparency, inclusivity, and thoughtful design. To me, real innovation happens when AI empowers people — staying grounded in purpose, not just performance.",
    pattern: "diamonds",
  },
];

// Stats data
const stats = [
  { label: "Years Experience", value: `${new Date().getFullYear() - 2021}+` },
  { label: "Projects Completed", value: "20+" },
  { label: "ML Models Deployed", value: "10+" },
  { label: "Technologies", value: "15+" },
];

// SVG Patterns for personality cards
const cardPatterns = {
  hexagon: (
    <path
      d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z M25 43.3L50 25L75 43.3V75L50 93.3L25 75V43.3Z"
      stroke="currentColor"
      strokeWidth="0.5"
    />
  ),
  circles: (
    <>
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.5" />
    </>
  ),
  diamonds: (
    <>
      <path
        d="M20 50L50 20L80 50L50 80L20 50Z"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <path
        d="M10 50L50 10L90 50L50 90L10 50Z"
        stroke="currentColor"
        strokeWidth="0.5"
      />
    </>
  ),
};

// Helper components
const AnimatedHighlight: React.FC<{ text: string; delay?: number }> = ({
  text,
  delay = 0,
}) => (
  <motion.span
    className="text-accent font-medium"
    animate={{
      color: ["#ff7e33", "#ff9e33", "#ff7e33"],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      delay,
    }}
  >
    {text}
  </motion.span>
);

const BioParagraph: React.FC<{
  content: string;
  highlight: string[];
  delay?: number;
}> = ({ content, highlight, delay = 0 }) => {
  const formattedContent = highlight.reduce(
    (text, word, i) => text.replace(`{${i}}`, `<highlight>${word}</highlight>`),
    content
  );

  const parts = formattedContent.split(/(<highlight>.*?<\/highlight>)/);

  return (
    <motion.p
      className="pl-0 md:pl-8 relative"
      whileInView={{ x: [10, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <span className="absolute left-0 top-2 w-2 h-2 rounded-full bg-accent hidden md:block"></span>
      {parts.map((part, i) => {
        if (part.startsWith("<highlight>")) {
          const text = part.replace(/<\/?highlight>/g, "");
          return (
            <span key={i} className="text-accent font-medium">
              {text}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </motion.p>
  );
};

const PersonalityCard: React.FC<{
  title: string;
  content: string;
  highlight: string[];
  pattern: keyof typeof cardPatterns;
  index: number;
}> = ({ title, content, highlight, pattern, index }) => {
  const formattedContent = highlight.reduce(
    (text, word, i) => text.replace(`{${i}}`, `<highlight>${word}</highlight>`),
    content
  );

  const parts = formattedContent.split(/(<highlight>.*?<\/highlight>)/);

  return (
    <motion.div
      className="bg-background/50 backdrop-blur-sm border border-white/10 p-6 rounded-lg hover-effect group relative overflow-hidden"
      data-cursor-text={title}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <div className="absolute top-0 right-0 opacity-10 w-40 h-40">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          fill="none"
          className="w-full h-full"
        >
          {cardPatterns[pattern]}
        </svg>
      </div>

      <h5 className="text-accent mb-3 font-medium text-lg flex items-center">
        <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mr-2 text-sm">
          {index + 1}
        </span>
        {title}
      </h5>
      <p className="relative z-10">
        {parts.map((part, i) => {
          if (part.startsWith("<highlight>")) {
            const text = part.replace(/<\/?highlight>/g, "");
            return <AnimatedHighlight key={i} text={text} />;
          }
          return <span key={i}>{part}</span>;
        })}
      </p>

      <div className="absolute bottom-0 left-0 h-1 bg-accent w-0 group-hover:w-full transition-all duration-300 ease-in-out"></div>
    </motion.div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-3 relative">
              <span className="text-accent">About</span> Me
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto rounded-full mt-4"></div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-white/70 max-w-xl mx-auto mt-6 text-lg"
          >
            {bioContent.subtitle}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Image and quick stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <motion.div
              variants={itemVariants}
              className="rounded-xl overflow-hidden relative aspect-[4/5] mb-8 hover-effect group"
              data-cursor-text="That's Me!"
            >
              {/* Background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/40 to-background/20 mix-blend-overlay z-10 rounded-xl"></div>
              <div className="absolute -top-12 -left-12 w-24 h-24 border-2 border-accent/20 rounded-xl z-0 group-hover:scale-95 transition-transform duration-700"></div>
              <div className="absolute -bottom-12 -right-12 w-24 h-24 border-2 border-accent/20 rounded-xl z-0 group-hover:scale-95 transition-transform duration-700"></div>

              <motion.div
                initial={{ filter: "blur(0px)" }}
                whileHover={{ filter: "blur(2px)" }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-gradient-to-br from-accent/30 to-background rounded-xl flex items-center justify-center relative"
              >
                <Image
                  src={LiLsaImg}
                  alt="LiLsa"
                  fill
                  className="object-cover rounded-xl"
                />
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-background/85 backdrop-blur-lg border border-white/10 p-5 rounded-lg hover:border-accent/50 transition-all duration-300 hover-effect group overflow-hidden relative"
                  data-cursor-text={stat.label}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="absolute -inset-1 bg-accent/5 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:duration-200" />
                  <div className="absolute -top-1 -right-1 w-8 h-8">
                    <div className="absolute transform rotate-45 bg-accent/30 w-8 h-8"></div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-accent mb-1 relative z-10">
                    {stat.value}
                  </h3>
                  <p className="text-sm relative z-10">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Bio and skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white flex items-center flex-wrap">
                <div className="flex items-center">
                  <span className="text-accent mr-2">&lt;/&gt;</span>
                  {bioContent.title}
                </div>
              </h3>

              <div className="space-y-5 text-white/80 relative">
                {/* Decorative line */}
                <div className="absolute -left-2 -top-2 bottom-0 w-px bg-gradient-to-b from-accent/0 via-accent/20 to-accent/0 ml-3 hidden md:block"></div>

                {bioContent.paragraphs.map((paragraph, index) => (
                  <BioParagraph
                    key={index}
                    content={paragraph.content}
                    highlight={paragraph.highlight}
                    delay={index * 0.2}
                  />
                ))}
              </div>
            </motion.div>

            {/* Personality Section */}
            <motion.div variants={itemVariants} className="mt-10">
              <h4 className="text-xl md:text-2xl font-semibold mb-6 text-white flex items-center">
                <span className="text-accent mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </span>
                My Psychology & Personality
              </h4>

              <div className="space-y-6">
                {personalityCards.map((card, index) => (
                  <PersonalityCard
                    key={card.id}
                    title={card.title}
                    content={card.content}
                    highlight={card.highlight}
                    pattern={card.pattern as keyof typeof cardPatterns}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>

            {/* Resume Download Button */}
            <motion.div variants={itemVariants} className="mt-10">
              <a
                href="/resume.pdf"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-medium tracking-wide text-background bg-accent rounded-full overflow-hidden hover-effect"
                data-cursor-text="Download"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-accent to-[#FFA07A] group-hover:scale-105 transition-transform duration-300"></span>
                <span className="relative z-10 text-foreground flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Download Resume
                </span>
                <span className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-white/40"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -30],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0.5],
                      }}
                      transition={{
                        duration: 1 + Math.random(),
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: Math.random() * 0.5,
                      }}
                    />
                  ))}
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
