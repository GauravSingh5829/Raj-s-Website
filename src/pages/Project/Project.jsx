import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

import "./Project.css";
import img1 from "../../assets/images/ecom.png";
import img2 from "../../assets/images/codecollabymain.png";
import img3 from "../../assets/images/blinkchat.png";
import img4 from "../../assets/images/WordPress dashboard design concept.jpg";
import img5 from "../../assets/images/Game Dashboard Design.jpg";
import img6 from "../../assets/images/Task manager app.jpg";

import scrollImg1 from "../../assets/images/ecomfull.png";
import scrollImg2 from "../../assets/images/codecollaby.png";
import scrollImg3 from "../../assets/images/blinkfull.png";
import scrollImg4 from "../../assets/images/WordPress dashboard design concept.jpg";
import scrollImg5 from "../../assets/images/Game Dashboard Design.jpg";
import scrollImg6 from "../../assets/images/Task manager app.jpg";

// Placeholder images injected ONLY so this live preview doesn't crash.
// const img1 = "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80";
// const scrollImg1 = "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=3000&fit=crop&q=80";

// const img2 = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80";
// const scrollImg2 = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=3000&fit=crop&q=80";

// const img3 = "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80";
// const scrollImg3 = "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=3000&fit=crop&q=80";

// const img4 = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80";
// const scrollImg4 = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=3000&fit=crop&q=80";

// const img5 = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80";
// const scrollImg5 = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=3000&fit=crop&q=80";

// const img6 = "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80";
// const scrollImg6 = "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=3000&fit=crop&q=80";

const projects = [
  {
    title: "E-Commerce Website",
    img: img1,
    scrollImg: scrollImg1,
    desc: "A Beautiful Full Stack e-commerce experience for a luxury heritage brand. This project focuses on minimalist design and visual storytelling to showcase traditional Indian craftsmanship for a modern audience.",
    skills: ["React", "JavaScript", "Tailwind CSS ", "Node.js", "Express", "MongoDB", "RESTful APIs"],
    previewLink: "https://sohwais.com/"
  },
  {
    title: "Code Collaby",
    img: img2,
    scrollImg: scrollImg2,
    desc: "CodeCollaby a real-time code collaboration platform allowing developers to write, edit, and run code together—anytime, anywhere.",
    skills: ["React.js", "Tailwind CSS", "JavaScript", "Node.js", "Express.js", "Socket.IO", "MongoDB", "JWT-based Auth System"],
    previewLink: "https://codecollaby-frontend.onrender.com/"
  },
  {
    title: "Blink Chat",
    img: img3,
    scrollImg: scrollImg3,
    desc: "Private, self-destructing chat rooms that disappear after 10 minutes. No accounts, no history, just secure conversations.",
    skills: ["React", "Next.js", "Tailwind CSS", "TanStack Query", "Upstash Realtime","Upstash Redis"],
    previewLink: "https://blinkchat-anonymous-chat-app.vercel.app/"
  },
  {
    title: "Blog Website",
    img: img4,
    scrollImg: scrollImg4,
    desc: "Clean and simple blogging platform with markdown support.",
    skills: ["HTML", "Tailwind", "JavaScript"],
    previewLink: "https://vercel.com/blog"
  },
  {
    title: "Game Landing Page",
    img: img5,
    scrollImg: scrollImg5,
    desc: "Landing page for a game with animations and parallax effects.",
    skills: ["HTML", "CSS", "GSAP"],
    previewLink: "https://playvalorant.com"
  },
  {
    title: "Task Manager",
    img: img6,
    scrollImg: scrollImg6,
    desc: "Task tracking web app with CRUD features and clean UI.",
    skills: ["HTML", "CSS", "JS"],
    previewLink: "https://linear.app"
  }
];

const SneakPeekScrollWrapper = ({ baseSrc, scrollSrc, alt, href }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 100, damping: 15 };
  const translateX = useSpring(x, springConfig);
  const translateY = useSpring(y, springConfig);
  
  const rotateX = useSpring(useTransform(y, [-100, 100], [12, -12]), springConfig); 
  const rotateY = useSpring(useTransform(x, [-100, 100], [-12, 12]), springConfig); 
  const rotateZ = useSpring(useTransform(x, [-100, 100], [-4, 4]), springConfig); 

  const handleMouseMove = (event) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenterX = eventOffsetX - targetRect.width / 2;
    x.set(offsetFromCenterX);

    const eventOffsetY = event.clientY - targetRect.top;
    const offsetFromCenterY = eventOffsetY - targetRect.height / 2;
    y.set(offsetFromCenterY); 
  };

  return (
    <div 
      style={{ position: 'relative', width: '100%', cursor: 'pointer' }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onMouseMove={handleMouseMove}
      onClick={() => {
        if (href) window.open(href, "_blank", "noopener,noreferrer");
      }}
    >
      {/* BASE CARD IMAGE (Thumbnail) */}
      <div style={{ width: '100%', height: '180px', overflow: 'hidden', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
        <img 
          src={baseSrc} 
          alt={alt} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} 
        />
      </div>

      {/* SNEAK PEEK POPUP (Using the scrollSrc) */}
      <div style={{ position: 'absolute', zIndex: 50, left: '50%', top: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
        <AnimatePresence>
          {isOpen && isMounted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { type: "spring", stiffness: 260, damping: 14 }
              }}
              exit={{ opacity: 0, scale: 0.6 }}
              style={{ 
                x: translateX, 
                y: translateY, 
                rotateX, 
                rotateY, 
                rotate: rotateZ,
                transformPerspective: 1000,
                width: '340px',
                transformOrigin: 'center',
                borderRadius: '16px',
                boxShadow: '0 30px 60px -15px rgba(0,0,0,0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: '#121212',
                padding: '6px',
                WebkitTransformStyle: 'preserve-3d', 
                pointerEvents: 'none'
              }}
            >
               <div style={{ position: 'relative', width: '100%', height: '190px', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'black' }}>
                 
                 <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: "calc(-100% + 190px)" }}
                    transition={{ 
                        type: "tween", 
                        duration: 3.5, 
                        ease: "easeInOut", 
                        delay: 0.2 
                    }}
                    style={{ 
                        width: '100%', 
                        willChange: 'transform',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                    }}
                 >
                   <img
                      src={scrollSrc} // Using the tall screenshot here
                      alt={`${alt} Full Preview`}
                      style={{ 
                          width: '100%', 
                          height: 'auto', 
                          display: 'block',
                          borderRadius: '12px' 
                      }}
                   />
                 </motion.div>
                 
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function Project() {
  return (
    <section className="project" id="project">
      <div className="title">
        <h2>Project</h2>
      </div>
      <div className="projects-container">
        {projects.map((project, index) => (
          <motion.div 
            className="project-card" 
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
          >
            {index === 0 && (
              <div className="project-doodle-container">
                <span className="project-doodle-text">hover over any project to see a preview</span>
                <svg className="project-doodle-arrow" width="60" height="50" viewBox="0 0 60 50">
                  <path d="M 5, 10 Q 25, 5 45, 25 Q 50, 30 55, 35" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M 42, 35 L 55, 35 L 55, 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
            <SneakPeekScrollWrapper 
              baseSrc={project.img} 
              scrollSrc={project.scrollImg}
              alt={project.title} 
              href={project.previewLink} 
            />
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
            <div className="skills">
              {project.skills.map((skill, i) => (
                <span key={i}>{skill}</span>
              ))}
            </div>
            <div className="btns">
              <a href="https://github.com/GauravSingh5829" className="btn" target="_blank" rel="noreferrer">
                <i className="fab fa-github"></i> GitHub
              </a>
              <a href={project.previewLink} className="btn" target="_blank" rel="noreferrer">
                <i className="fas fa-external-link-alt"></i> Live Demo
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}