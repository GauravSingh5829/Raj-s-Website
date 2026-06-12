import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./About.css";
import Skills from "./Skills";

const DISCORD_ID = '1311236719755923457';

const AnimatedChars = ({ text, className, delay = 0, style }) => {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: delay }
    }
  };
  
  const child = {
    hidden: { opacity: 0, filter: "blur(10px)", scale: 0.8, y: 15 },
    visible: { 
      opacity: 1, filter: "blur(0px)", scale: 1, y: 0, 
      transition: { type: "spring", damping: 15, stiffness: 120 } 
    }
  };

  return (
    <motion.span
      style={style}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
        >
          {Array.from(word).map((letter, letterIndex) => (
            <motion.span
              variants={child}
              key={letterIndex}
              style={{ display: "inline-block" }}
            >
              {letter}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </motion.span>
  );
};

function About() {
  const [flip, setFlip] = useState(false);
  const [spotify, setSpotify] = useState(null);
  const [isLive, setIsLive] = useState(false);


  useEffect(() => {
    const savedSong = localStorage.getItem('last_played_song');
    if (savedSong) setSpotify(JSON.parse(savedSong));

    // Initial REST fetch for immediate data
    const fetchSpotify = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const res = await response.json();
        if (res.data?.spotify) {
          setSpotify(res.data.spotify);
          setIsLive(res.data.listening_to_spotify);
          localStorage.setItem('last_played_song', JSON.stringify(res.data.spotify));
        } else if (res.data) {
          setIsLive(false);
        }
      } catch (err) {}
    };
    fetchSpotify();

    // Persistent WebSocket with heartbeat & auto-reconnect
    let socket = null;
    let heartbeatInterval = null;
    let reconnectTimeout = null;
    let isMounted = true;

    function connect() {
      if (!isMounted) return;
      socket = new WebSocket('wss://api.lanyard.rest/socket');

      socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);

        // Opcode 1: Hello — start heartbeat and subscribe
        if (msg.op === 1) {
          const interval = msg.d.heartbeat_interval;

          // Send heartbeats at the required interval
          if (heartbeatInterval) clearInterval(heartbeatInterval);
          heartbeatInterval = setInterval(() => {
            if (socket && socket.readyState === WebSocket.OPEN) {
              socket.send(JSON.stringify({ op: 3 }));
            }
          }, interval);

          // Subscribe to presence updates
          socket.send(JSON.stringify({
            op: 2,
            d: { subscribe_to_id: DISCORD_ID }
          }));
        }

        // Opcode 0: Event dispatch (INIT_STATE / PRESENCE_UPDATE)
        if (msg.op === 0 && (msg.t === 'INIT_STATE' || msg.t === 'PRESENCE_UPDATE')) {
          const d = msg.d;
          if (d.spotify) {
            setSpotify(d.spotify);
            setIsLive(true);
            localStorage.setItem('last_played_song', JSON.stringify(d.spotify));
          } else {
            setIsLive(false);
          }
        }
      };

      socket.onclose = () => {
        if (heartbeatInterval) clearInterval(heartbeatInterval);
        // Auto-reconnect after 5 seconds
        if (isMounted) {
          reconnectTimeout = setTimeout(connect, 5000);
        }
      };

      socket.onerror = () => {
        socket.close();
      };
    }

    connect();

    return () => {
      isMounted = false;
      if (heartbeatInterval) clearInterval(heartbeatInterval);
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      if (socket) socket.close();
    };
  }, []);

  return (
    <div className="about" id="about">
      <div className="title">
        <h2>About Me</h2>
      </div>

      <div className="content">
        <div className="photo-section">
          {/* FEATURE REVERT: Original Clean 3D Flip Card */}
          <div
            className="photo-card"
            onClick={() => setFlip(!flip)}
          >
            <div className={flip ? "photo-inner flip" : "photo-inner"}>
              <div className="photo-front">
                <img src="/aboutfold.png" alt="Front Profile" />
              </div>

              <div className="photo-back">
                <img src="/avatar.png" alt="Back Profile" />
              </div>
            </div>
          </div>

          {/* FEATURE 3: Premium Spotify Widget */}
          {spotify && (
            <motion.div 
              className="spotify-card"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            >
              <div className="spotify-visual">
                <img 
                  src={spotify.album_art_url} 
                  alt="Album Art" 
                  className={isLive ? "playing" : ""} 
                />
                {isLive && (
                  <div className="spotify-equalizer">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                  </div>
                )}
              </div>
              <div className="spotify-details">
                <span className="spotify-status-label">
                  {isLive ? "Currently Playing" : "Last Played"}
                </span>
                <p className="spotify-song">{spotify.song}</p>
                <p className="spotify-artist">{spotify.artist}</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Cinematic Scroll Reveal Container */}
        <div className="text-about">
          <div className="hero-content">
            <div className="hero-name">
              <AnimatedChars text="Gaurav Kumar Singh" delay={0.1} />
            </div>
            
            <h1 className="hero-title">
              <AnimatedChars text="Your go-to Developer" delay={0.6} />
              <br /> {/*for Next.js projects*/}
            </h1>
            
            <p className="hero-description">
              <AnimatedChars text="Currently pursuing " delay={1.2} />
              <b>
                 <AnimatedChars text="Bachelor of Technology degree " delay={1.5} />
              </b>
              <AnimatedChars text="from GGSIPU!! " delay={2.1} />
              <br/><br/>
              <AnimatedChars 
                 text="Bringing your ideas to life with clean, efficient, and scalable code. Whether it's building web apps, optimizing performance, or solving complex technical challenges." 
                 delay={2.6} 
              />
            </p>
            
            <div className="hero-buttons">
              {/* <button className="btn-primary">Contact me</button> */}
              <a href="#project">
              <button className="btn-secondary">View projects</button>
              </a>
              <motion.a 
                href="#experience"
                className="btn-glass"
                initial={{ opacity: 0, filter: "blur(8px)", scale: 0.9 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                What i did?
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      <Skills />
    </div>
  );
}

export default About;