import "./Header.css"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faInstagram, faLinkedin, faDiscord } from "@fortawesome/free-brands-svg-icons"

const DISCORD_ID = '1311236719755923457'; 

const STATUS_IMAGES = {
    online: "online.png", 
    idle: "idel.png",   
    dnd: "dnd.png",    
    offline: "offline.png" 
};

const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Project', href: '#project' },
    { name: 'Services', href: '#serv' },
    { name: 'Contact', href: '#contact' }
];

const socialLinks = [
    { icon: faDiscord, href: 'https://discord.com/users/1311236719755923457', tooltip: 'click to have a chat :)' },
    { icon: faGithub, href: 'https://github.com/GauravSingh5829/GauravSingh5829', tooltip: 'click to see my progress ;)' },
    { icon: faInstagram, href: 'https://www.instagram.com/rajsingh_58/?hl=en', tooltip: 'click to meet me o-o' },
    { icon: faLinkedin, href: 'https://www.linkedin.com/in/gaurav-kumar-singh-raj5829/', tooltip: 'click to give referal >_<' }
];

function Header() {

    const [scrolled, setScrolled] = useState(false);
    const [status, setStatus] = useState("offline");
    const [imgError, setImgError] = useState(false);
    const [activeTab, setActiveTab] = useState('#hero');
    const [hoveredIcon, setHoveredIcon] = useState(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        // 1. Handle Scroll Logic & Scroll Spy
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // True Euclidean Distance to simulate 'mix-blend-mode' perfectly without foreground artifacts
            const docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            const docW = Math.max(document.body.clientWidth, document.documentElement.clientWidth);
            const centerY = docH / 2;
            const centerX = docW / 2;

            const tooltipY = window.scrollY + 70;
            const tooltipX = docW * 0.85;

            const dist = Math.sqrt(Math.pow(tooltipX - centerX, 2) + Math.pow(tooltipY - centerY, 2));
            const maxDist = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
            const ratio = Math.max(0, Math.min(1, dist / maxDist));

            let bgL = 0;
            if (ratio <= 0.15) bgL = 100 - (ratio / 0.15) * 18;
            else if (ratio <= 0.50) bgL = 82 - ((ratio - 0.15) / 0.35) * 20;
            else if (ratio <= 0.80) bgL = 62 - ((ratio - 0.50) / 0.30) * 22;
            else if (ratio <= 0.95) bgL = 40 - ((ratio - 0.80) / 0.15) * 24;
            else bgL = 16 - ((ratio - 0.95) / 0.05) * 16;

            let tooltipL = 95;
            if (bgL > 55) {
                tooltipL = 10;
            } else if (bgL >= 45) {
                tooltipL = 95 - ((bgL - 45) / 10) * 85;
            }

            // Force white starting from the project section downwards (with a smooth transition)
            const projectSec = document.getElementById('project');
            if (projectSec) {
                const distanceToProject = projectSec.offsetTop - (window.scrollY + 70);
                if (distanceToProject <= 0) {
                    tooltipL = 100;
                } else if (distanceToProject < 150) {
                    // Smoothly blend color to white as we scroll closer (within 150px)
                    const factor = (150 - distanceToProject) / 150;
                    tooltipL = tooltipL + (100 - tooltipL) * factor;
                }
            }

            if (overlayRef.current) {
                overlayRef.current.style.color = `hsl(0, 0%, ${tooltipL}%)`;
            }
            
            // ScrollSpy Math
            const scrollPosition = window.scrollY + window.innerHeight / 3;
            let current = '#hero';
            for (let i = navLinks.length - 1; i >= 0; i--) {
                const section = document.getElementById(navLinks[i].href.substring(1));
                if (section) {
                    if (scrollPosition >= section.offsetTop) {
                        current = navLinks[i].href;
                        break;
                    }
                }
            }
            setActiveTab(current);
        }
        
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        handleScroll();

        // 2. IMMEDIATE FETCH (Prevents "Offline" flicker on refresh)
        const fetchInitialStatus = async () => {
            try {
                const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
                const res = await response.json();
                if (res.data) {
                    setStatus(res.data.discord_status || 'offline');
                }
            } catch (err) { }
        };
        fetchInitialStatus();

        // 3. WebSocket for Real-time Updates
        const socket = new WebSocket('wss://api.lanyard.rest/socket');
        
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.op === 1) socket.send(JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_ID } }));
            if (data.t === 'INIT_STATE' || data.t === 'PRESENCE_UPDATE') {
                const newStatus = data.d.discord_status || 'offline';
                setStatus(newStatus);
                setImgError(false);
            }
        };

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
            socket.close();
        };
    }, []);

    return (
        <>
            <header className={scrolled ? "header scroll" : "header"}>

             {/* --- ORIGINAL BORDER BEAM (SVG ARCHITECTURE) --- */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "30px" }}>
                <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "visible", filter:"drop-shadow(0 0 6px pink)" }}>
                    {Array.from({ length: 60 }).map((_, i) => {
                        const step = i / 59; 
                        const L = 30 - step * 29; 
                        const width = 0.5 + step * 2; 
                        const opacity = 0.04; 
                        return (
                            <rect
                                key={i} x="0" y="0" width="100%" height="100%" rx="30"
                                fill="none" stroke="#ffffff" strokeWidth={width} strokeOpacity={opacity}
                                strokeLinecap="round" pathLength="100" strokeDasharray={`0 ${100 - L} ${L} 0`}
                                style={{ animation: `svg-beam-travel 8s linear infinite` }}
                            />
                        )
                    })}
                    <rect
                        x="0" y="0" width="100%" height="100%" rx="30"
                        fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"
                        pathLength="100" strokeDasharray={`0 99.9 0.1 0`}
                        style={{ animation: `svg-beam-travel 8s linear infinite` }}
                    />
                </svg>
            </div>
            
            <div className="logo">
                <h1><span>Gaurav</span>Singh</h1>
            </div>

            <ul className="links">
                {navLinks.map((link) => (
                    <li key={link.href} style={{ position: "relative" }}>
                        <a 
                            href={link.href}
                            style={{
                                position: "relative",
                                zIndex: 2,
                                color: activeTab === link.href ? "#fff" : "#ccc",
                                transition: "color 0.3s"
                            }}
                        >
                            {link.name}
                        </a>
                        
                        {/* FEATURE 1: DYNAMIC SCROLL PILL */}
                        {activeTab === link.href && (
                            <motion.div
                                layoutId="active-pill"
                                style={{
                                    position: "absolute",
                                    inset: "-6px -14px",
                                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                                    borderRadius: "20px",
                                    zIndex: 1,
                                    backdropFilter: "blur(5px)"
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            />
                        )}
                    </li>
                ))}
            </ul>

            <ul className="icons">
                {socialLinks.map((social, index) => (
                    <li key={index} className="social-icon-li"
                        onMouseEnter={() => setHoveredIcon(index)}
                        onMouseLeave={() => setHoveredIcon(null)}>
                        <a href={social.href} target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={social.icon} />
                        </a>
                    </li>
                ))}

                <li className={`status-li status-${status}`}
                    onMouseEnter={() => setHoveredIcon('status')}
                    onMouseLeave={() => setHoveredIcon(null)}>
                    <div className="status-avatar-wrapper">
                        {imgError ? (
                            <div className="fallback-avatar">{status[0]}</div>
                        ) : (
                            <img src={STATUS_IMAGES[status]} alt={status} className="status-avatar" onError={() => setImgError(true)} />
                        )}
                    </div>
                </li>
            </ul>
        </header>

        {/* --- ADAPTIVE TOOLTIPS OVERLAY --- */}
        <div ref={overlayRef} className="tooltips-overlay" style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '85%',
            padding: '14px 30px',
            display: 'flex',
            justifyContent: 'flex-end',
            pointerEvents: 'none',
            zIndex: 1010
        }}>
            <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
                {socialLinks.map((social, index) => (
                    <div key={index} style={{ width: '22px', position: 'relative' }}>
                        <div 
                            className={`scribble-container ${hoveredIcon === index ? 'active' : ''}`}
                            style={index === 0 || index === 1 ? { left: '-102px' } : {}}
                        >
                            <svg className="scribble-arrow" width="50" height="40" viewBox="0 0 50 40">
                                <path d="M5,35 Q10,25 20,20 Q35,12 42,4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M34,5 L42,4 L40,12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="scribble-text">{social.tooltip}</span>
                        </div>
                    </div>
                ))}
                
                <div style={{ width: '50px', marginLeft: '5px', position: 'relative' }}>
                    <div className={`scribble-container ${hoveredIcon === 'status' ? 'active' : ''}`}>
                        <svg className="scribble-arrow" width="50" height="40" viewBox="0 0 50 40">
                            <path d="M5,35 Q10,25 20,20 Q35,12 42,4 M42,4 L34,5 M42,4 L40,12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="scribble-text">Work Status: {status}</span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Header
