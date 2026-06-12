import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import "./Hero.css";

const AnimatedChars = ({ text }) => {
  const letters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.2 },
    },
  };

  const child = {
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    },
    hidden: { 
      opacity: 0, 
      y: 40, 
      filter: "blur(10px)",
      scale: 0.8 
    },
  };

  return (
    <motion.span variants={container} initial="hidden" animate="visible" style={{ display: "inline-block" }}>
      {letters.map((letter, index) => (
        <motion.span 
          key={index}
          variants={child} 
          style={{ display: "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

const AnimatedRole = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
        setIsFirstRender(false);
        setIndex((prev) => (prev + 1) % words.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [words.length]);

  const entryContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 1.2 },
    },
  };

  const firstWordContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 1.36 },
    },
  };

  const loopContainer = {
    hidden: { 
      opacity: 0,
      transition: { staggerChildren: 0.02, staggerDirection: -1 }
    },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.0 },
    },
  };

  const child = {
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    },
    hidden: { 
      opacity: 0, 
      y: 20, 
      filter: "blur(10px)",
      scale: 0.8,
      transition: { duration: 0.4 }
    },
  };

  return (
    <motion.div 
      className="hero-role-wrapper"
      variants={entryContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="static-role-prefix" style={{ display: 'flex' }}>
        {Array.from("~~A ").map((letter, i) => (
          <motion.span 
            key={"prefix-" + i}
            variants={child} 
            style={{ display: "inline-block" }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>
      <div className="animated-role-box">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={isFirstRender && index === 0 ? firstWordContainer : loopContainer}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ whiteSpace: 'nowrap', display: 'flex' }}
          >
            {Array.from(words[index]).map((letter, i) => (
              <motion.span 
                key={i}
                variants={child} 
                style={{ display: "inline-block" }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function Hero() {
  const roles = ["Software Engineer", "FullStack Developer", "React Developer"];
  return (
    <div className="hero" id="hero">
      
      <div className="hero-text">
        <h1 style={{ display: 'flex', alignItems: 'baseline' }}>
          <AnimatedChars text="Hi! I'm" />
          <span className="hero-name-span">
            <AnimatedChars text="Gaurav" />
          </span>
        </h1>
        <AnimatedRole words={roles} />
      </div>

      <div className="hero-image-wrapper">
        <motion.div 
          className="hero-image-container"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <img src="/avatar_hero.png" alt="Gaurav" className="hero-image" />
        </motion.div>
      </div>
      
      <div className="content">
        <div className="buttn">
          <motion.a 
            href="/gres.pdf" download="Gaurav_Resume.pdf"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)", scale: 0.9 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Resume
          </motion.a>
          <motion.a 
            href="#about"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)", scale: 0.9 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 1, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Who i'm?
          </motion.a>
        </div>
      </div>
    </div>
  );
}
