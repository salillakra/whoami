"use client";
import React, { useEffect } from "react";
import MenuIcon from "@/components/animations/Icons/Menu";
import CrossIcon from "@/components/animations/Icons/Cross";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import LiLsaLogo from "../Logo";
import HoverTextTranslateEffect from "../animations/HoverTextEffect";
import RevelMagnet from "../animations/RevelMagnet";
import AniCursor from "../animations/AniCursor";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Projects", href: "/projects" },
    { title: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = "";
      };
    }
  }, [isOpen]);

  return (
    <>
      <div className="inline-block absolute top-0 left-5 z-10">
        <div className="text-foreground font-bold text-xl">
          <LiLsaLogo />
        </div>
      </div>

      <div
        data-cursor-text="Close"
        className="inline-block hover-effect fixed right-4 top-0 bg-gray-800 m-2.5 hover:bg-gray-950/98 transition-all duration-300 ease-in-out rounded-full z-50"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white cursor-pointer p-2 focus:outline-none z-50 relative"
        >
          {isOpen ? (
            <CrossIcon key="cross-icon" />
          ) : (
            <MenuIcon key="menu-icon" />
          )}
        </button>
      </div>

      <AnimatePresence mode="wait" initial={true}>
        {isOpen && (
          <div className="overflow-hidden cursor-none">
            <motion.div
              key={"menu-animation"}
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", transition: { duration: 0.4, delay: 0.4 } }}
              transition={{ duration: 0.4 }}
              className="fixed top-0 left-0 w-full h-full bg-[#ff6b6b] z-30 flex flex-col items-center justify-center cursor-none"
            ></motion.div>

            <motion.div
              key={"menu-overlay"}
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                x: "-100%",
                opacity: 0,
                transition: { duration: 0.4 },
              }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="fixed inset-0 bg-gradient-to-b from-foreground to-foreground/95 z-30 flex flex-col justify-center items-center cursor-none backdrop-blur-sm"
            >
              <AniCursor />
              <div className="text-center mb-8 cursor-none">
                <RevelMagnet
                  data-cursor-text="Explore"
                  className="text-5xl hover-effect cursor-none"
                >
                  <HoverTextTranslateEffect
                    Text="Menu"
                    className="text-7xl font-bold text-accent cursor-none"
                  />
                </RevelMagnet>
              </div>

              <div className="flex flex-col items-center justify-center gap-8 w-full max-w-2xl cursor-none">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 1 + index * 0.1,
                        duration: 0.5,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      y: 20,
                      transition: {
                        duration: 0.3,
                        delay: 0.1 * (menuItems.length - index - 1),
                      },
                    }}
                    className="w-full overflow-hidden cursor-none"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between w-full hover-effect py-4 border-b border-accent/10 cursor-none"
                      data-cursor-text={item.title}
                    >
                      <div className="flex items-center cursor-none">
                        <span className="text-accent/60 font-mono mr-4 cursor-none">
                          0{index + 1}
                        </span>{" "}
                        <motion.span
                          className="text-4xl font-medium p-2 uppercase text-background relative inline-block cursor-none"
                          whileHover={{ x: 10 }}
                        >
                          <HoverTextTranslateEffect
                            Text={item.title}
                            className="hover:text-accent text-accent/90 transition-colors cursor-none"
                          />
                        </motion.span>
                      </div>
                      <motion.svg
                        className="opacity-0 group-hover:opacity-100 transition-opacity cursor-none"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0, scale: 1.1 }}
                      >
                        <path
                          d="M7 17L17 7M17 7H10M17 7V14"
                          stroke="#ff6b6b"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="absolute bottom-8 left-0 right-0 flex justify-center cursor-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 1.3, duration: 0.5 },
                }}
                exit={{ opacity: 0, y: 20 }}
              >
                <div className="flex gap-6 text-accent/80 cursor-none">
                  <a
                    href="https://github.com/salillakra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-effect cursor-none"
                    data-cursor-text="GitHub"
                  >
                    <span className="text-sm uppercase tracking-wider hover:text-accent transition-colors cursor-none">
                      GitHub
                    </span>
                  </a>
                  <a
                    href="https://linkedin.com/in/salillakra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-effect cursor-none"
                    data-cursor-text="LinkedIn"
                  >
                    <span className="text-sm uppercase tracking-wider hover:text-accent transition-colors cursor-none">
                      LinkedIn
                    </span>
                  </a>
                  <a
                    href="mailto:salillakra.dev@gmail.com"
                    className="hover-effect cursor-none"
                    data-cursor-text="Email"
                  >
                    <span className="text-sm uppercase tracking-wider hover:text-accent transition-colors cursor-none">
                      Contact
                    </span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
