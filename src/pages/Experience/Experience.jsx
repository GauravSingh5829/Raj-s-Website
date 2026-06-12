import React, { useRef, useState } from "react";
import { motion, useScroll, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion";
import "./Experience.css";

const experiences = [
  {
    role: "Software Development Engineer (SDE) Intern",
    company: "Snowie.ai",
    duration: "2024 - Present",
    desc: "Working on core product features, improving system performance, and shipping responsive web interfaces.",
    achievements: [
      "Designed and implemented high-performance React components.",
      "Optimized the core web-vitals resulting in a 20% speed improvement.",
      "Collaborated closely with the AI backend team to surface real-time data."
    ],
    skills: ["React", "JavaScript", "Tailwind CSS"]
  },
  {
    role: "Frontend Developer Intern",
    company: "Yogui Media",
    duration: "2023 - 2024",
    desc: "Developed and maintained several client-facing interfaces. Optimized web application performance and collaborated with design teams to fulfill modern UX standards.",
    achievements: [
      "Rebuilt 3 legacy client websites in modern React.",
      "Integrated complex Framer Motion animations to enrich user experience.",
      "Ensured pixel-perfect mobile responsiveness across all devices."
    ],
    skills: ["HTML", "CSS", "JavaScript", "React"]
  },
  {
    role: "Freelance Web Developer",
    company: "Self-Employed",
    duration: "2022 - 2023",
    desc: "Designed and built custom portfolios and landing pages for local businesses, ensuring mobile responsiveness and blazing fast load times.",
    achievements: [
      "Delivered 5+ full-stack freelance platforms.",
      "Boosted client conversion rates by 30% via UX audits.",
      "Handled independent client communications and requirement gathering."
    ],
    skills: ["React", "Node.js", "Figma"]
  }
];

function TimelineCard({ exp }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isExpanded, setIsExpanded] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      layout
      className="timeline-content"
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.01 }}
      transition={{ layout: { type: "spring", stiffness: 300, damping: 30 }, scale: { type: "tween", duration: 0.2 } }}
    >
      <motion.div
        className="timeline-glow"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 0, 0, 0.06),
              transparent 80%
            )
          `,
        }}
      />
      <motion.div layout className="timeline-header">
        <motion.h3 layout className="timeline-role">{exp.role}</motion.h3>
        <motion.span layout className="timeline-duration">{exp.duration}</motion.span>
      </motion.div>
      <motion.h4 layout className="timeline-company">{exp.company}</motion.h4>
      <motion.p layout className="timeline-desc">{exp.desc}</motion.p>
      
      {/* Feature 1: Expandable Achievements */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="timeline-achievements-wrapper"
          >
            <ul className="timeline-achievements">
              {exp.achievements.map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button 
        layout
        className="timeline-expand-btn"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show Less" : "View Impact +"}
      </motion.button>

      <motion.div layout className="timeline-skills">
        {exp.skills.map((skill, i) => (
          <motion.span 
            key={i} 
            className="skill-tag"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.1 + 0.3 }}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="experience" id="experience">
      <motion.div 
        className="title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ willChange: "transform, opacity" }}
      >
        <h2>Experience</h2>
      </motion.div>
      
      <div className="timeline" ref={ref}>
        <div className="timeline-line-bg"></div>
        {/* Feature 3: Synchronized Line Tracking */}
        <motion.div 
          className="timeline-line-active"
          style={{ scaleY, transformOrigin: "top" }}
        ></motion.div>

        {experiences.map((exp, index) => (
          <motion.div 
            className="timeline-item" 
            key={index}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.1 }}
            style={{ willChange: "transform, opacity" }}
          >
            <motion.div 
              className="timeline-dot"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.1 + 0.2 }}
              style={{ willChange: "transform" }}
            ></motion.div>
            
            <TimelineCard exp={exp} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}


