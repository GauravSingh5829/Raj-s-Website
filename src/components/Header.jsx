import "./Header.css"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons"

const DISCORD_ID = '1311236719755923457'; 

const STATUS_IMAGES = {
    online: "online.png", 
    idle: "idel.png",   
    dnd: "dnd.png",    
    offline: "offline.png" 
};

function Header() {

    const [scrolled, setScrolled] = useState(false)
    const [status, setStatus] = useState("offline");
const [imgError, setImgError] = useState(false);

useEffect(() => {
        // 1. Handle Scroll Logic
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        }
        window.addEventListener("scroll", handleScroll);

        // 2. IMMEDIATE FETCH (Prevents "Offline" flicker on refresh)
        const fetchInitialStatus = async () => {
            try {
                const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
                const res = await response.json();
                if (res.data) {
                    setStatus(res.data.discord_status || 'offline');
                }
            } catch (err) {
                console.error("Error fetching initial status:", err);
            }
        };
        fetchInitialStatus();

        // 3. WebSocket for Real-time Updates
        const socket = new WebSocket('wss://api.lanyard.rest/socket');
        
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            
            // Initial Heartbeat / Subscribe
            if (data.op === 1) {
                socket.send(JSON.stringify({
                    op: 2,
                    d: { subscribe_to_id: DISCORD_ID }
                }));
            }

            // Listen for BOTH initial state and live presence updates
            if (data.t === 'INIT_STATE' || data.t === 'PRESENCE_UPDATE') {
                const presence = data.t === 'INIT_STATE' ? data.d : data.d;
                // If it's INIT_STATE, the data is inside d, if PRESENCE_UPDATE, it's also in d
                const newStatus = data.d.discord_status || 'offline';
                setStatus(newStatus);
                setImgError(false);
            }
        };

        return () => {
            window.removeEventListener("scroll", handleScroll);
            socket.close();
        };
    }, []);

    return (
        <header className={scrolled ? "header scroll" : "header"}>

             {/* --- ADDED BORDER BEAM (SVG ARCHITECTURE) --- */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "30px" }}>
                <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "visible",
                    filter:"drop-shadow(0 0 6px pink)"
                 }}>
                    
                    {/* We use 60 micro-layers to create a perfectly continuous, fading gradient line. No more cuts! */}
                    {Array.from({ length: 60 }).map((_, i) => {
                        const step = i / 59; // Scales from 0 (tail tip) to 1 (bright head)
                        const L = 30 - step * 29; // The tail stretches back smoothly up to 30 units
                        const width = 0.5 + step * 2; // Tapers thickness from 0.5px tail to 2.5px head
                        const opacity = 0.04; // Very low opacity that naturally stacks and blends into a solid core
                        
                        return (
                            <rect
                                key={i}
                                x="0" y="0" width="100%" height="100%" rx="30"
                                fill="none" stroke="#ffffff"
                                strokeWidth={width}
                                strokeOpacity={opacity}
                                strokeLinecap="round"
                                pathLength="100"
                                strokeDasharray={`0 ${100 - L} ${L} 0`}
                                style={{ 
                                    animation: `svg-beam-travel 8s linear infinite` 
                                }}
                            />
                        )
                    })}

                    {/* Solid Bright Head to ensure a pure white focal point */}
                    <rect
                        x="0" y="0" width="100%" height="100%" rx="30"
                        fill="none" stroke="#ffffff" strokeWidth="2.5"
                        strokeLinecap="round"
                        pathLength="100"
                        strokeDasharray={`0 99.9 0.1 0`}
                        style={{ 
                            animation: `svg-beam-travel 8s linear infinite`
                        }}
                    />
                </svg>
            </div>
            {/* -------------------------------------------- */}
            
            <div className="logo">
                <h1><span>Raj</span>Singh</h1>
            </div>

            <ul className="links">
                <li><a href="#hero">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#project">Project</a></li>
                <li><a href="#serv">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>

            <ul className="icons">
                <li><a href="https://github.com/GauravSingh5829/GauravSingh5829"><FontAwesomeIcon icon={faGithub} /></a></li>
                <li><a href="https://www.instagram.com/rajsingh_58/?hl=en"><FontAwesomeIcon icon={faInstagram} /></a></li>
                <li><a href="https://www.linkedin.com/in/gaurav-kumar-singh-raj5829/"><FontAwesomeIcon icon={faLinkedin} /></a></li>

                    <li className={`status-li status-${status}`}>
    <div className="status-avatar-wrapper">
        {imgError ? (
            <div className="fallback-avatar">{status[0]}</div>
        ) : (
            <img 
                src={STATUS_IMAGES[status]} 
                alt={status} 
                className="status-avatar" 
                onError={() => setImgError(true)}
            />
        )}
    </div>
    
    <div className="scribble-container">
        <svg className="scribble-arrow" width="50" height="40" viewBox="0 0 50 40">
            <path 
                d="M5,35 Q10,25 20,20 Q35,12 42,4 M42,4 L34,5 M42,4 L40,12" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.6" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
        </svg>
        <span className="scribble-text">Work Status: {status}</span>
    </div>
</li>
            </ul>
        </header>
    )
}

export default Header