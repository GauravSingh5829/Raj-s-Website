import { useEffect, useState } from "react";
import { animate } from "framer-motion";
import "./Footer.css"
import { FaGithub, FaLinkedin, FaInstagram, FaDiscord } from "react-icons/fa";

const VibeCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Hit our Vercel Serverless Function which natively tracks IP addresses and applies the 12-hour cooldown!
    fetch("/api/vibe?t=" + Date.now())
      .then(res => {
        if (!res.ok) throw new Error("Backend offline");
        return res.json();
      })
      .then(data => {
        if (typeof data.count !== "number") throw new Error("Invalid count");
        animate(0, data.count, {
          duration: 2.5,
          ease: "easeOut",
          onUpdate: (latest) => setCount(Math.round(latest))
        });
      })
      .catch(() => {
        // Failsafe: If local Vite server isn't restarted or Vercel hasn't deployed the backend yet,
        // instantly bypass the proxy and grab the raw global count so the UI never breaks.
        fetch("https://api.counterapi.dev/v1/rajsinghportfolio/vibes")
          .then(fallbackRes => fallbackRes.json())
          .then(fallbackData => {
            if (typeof fallbackData.count === "number") {
              animate(0, fallbackData.count, {
                duration: 2.5,
                ease: "easeOut",
                onUpdate: (latest) => setCount(Math.round(latest))
              });
            }
          })
          .catch(() => {
             // Total failure (e.g. adblocker + unbooted server)
             animate(0, 404, { duration: 1, onUpdate: (v) => setCount(Math.round(v)) });
          });
      });
  }, []);

  return (
    <div className="vibe-counter">
      <span className="vibe-text">Vibe Checked: </span>
      <span className="vibe-number">{count.toLocaleString()}</span>
    </div>
  );
};

function Footer(){

  return(

    <footer className="footer">

      <div className="footer-container">

        <p>© 2026 Gaurav Kumar Singh</p>

        <VibeCounter />

        <div className="social-icons">

          <a href="https://discord.com/users/1311236719755923457" target="_blank" rel="noreferrer"><FaDiscord/></a>
          <a href="https://github.com/GauravSingh5829/GauravSingh5829"><FaGithub/></a>
          <a href="https://www.linkedin.com/in/gaurav-kumar-singh-raj5829/"><FaLinkedin/></a>
          <a href="https://www.instagram.com/rajsingh_58/?hl=en"><FaInstagram/></a>

        </div>

      </div>

    </footer>

  )

}

export default Footer;