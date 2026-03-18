import React, { useState, useEffect } from "react";
import "./About.css";
import Skills from "./Skills";

// Your Discord ID for real-time tracking
const DISCORD_ID = '1311236719755923457';

function About() {
  const [flip, setFlip] = useState(false);
  
  // Spotify Presence States
  const [spotify, setSpotify] = useState(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // 1. Persistence: Load the last known song from localStorage immediately
    const savedSong = localStorage.getItem('last_played_song');
    if (savedSong) {
      setSpotify(JSON.parse(savedSong));
    }

    // 2. Initial Sync: Fetch current status from Lanyard REST API
    const fetchSpotify = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const res = await response.json();
        if (res.data?.spotify) {
          const spotifyData = res.data.spotify;
          setSpotify(spotifyData);
          setIsLive(res.data.listening_to_spotify);
          localStorage.setItem('last_played_song', JSON.stringify(spotifyData));
        }
      } catch (err) {
        console.error("Spotify sync error:", err);
      }
    };
    fetchSpotify();

    // 3. Live Updates: Connect to Lanyard WebSocket
    const socket = new WebSocket('wss://api.lanyard.rest/socket');
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      // Lanyard Heartbeat/Subscription
      if (data.op === 1) {
        socket.send(JSON.stringify({ 
          op: 2, 
          d: { subscribe_to_id: DISCORD_ID } 
        }));
      }
      
      // Presence update events
      if (data.t === 'INIT_STATE' || data.t === 'PRESENCE_UPDATE') {
        const d = data.d;
        if (d.spotify) {
          setSpotify(d.spotify);
          setIsLive(true);
          // Overwrite storage with the new current song
          localStorage.setItem('last_played_song', JSON.stringify(d.spotify));
        } else {
          // Keep the song data in 'spotify' state but mark as not live
          setIsLive(false);
        }
      }
    };

    return () => socket.close();
  }, []);

  return (
    <div className="about" id="about">
      <div className="title">
        <h2>About Me</h2>
      </div>

      <div className="content">
        <div className="photo-section">
          <div
            className="photo-card"
            onClick={() => setFlip(!flip)}
          >
            <div className={flip ? "photo-inner flip" : "photo-inner"}>
              <div className="photo-front">
                <img src="/aboutself2.png" alt="Front Profile" />
              </div>

              <div className="photo-back">
                <img src="/avatar.png" alt="Back Profile" />
              </div>
            </div>
          </div>

          {/* Spotify Integration - Surgical insert into photo-section */}
          {spotify && (
            <div className="spotify-card">
              <div className="spotify-visual">
                <img 
                  src={spotify.album_art_url} 
                  alt="Album Art" 
                  className={isLive ? "playing" : ""} 
                />
              </div>
              <div className="spotify-details">
                <span className="spotify-status-label">
                  {isLive ? "Currently Playing" : "Last Played"}
                </span>
                <p className="spotify-song">{spotify.song}</p>
                <p className="spotify-artist">{spotify.artist}</p>
              </div>
            </div>
          )}
        </div>

        {/* Updated Text Content */}
        <div className="text-about">
          <div className="hero-content">
            <div className="hero-name">Gaurav Kumar Singh</div>
            
            <h1 className="hero-title">
              Your go-to Developer<br /> {/*for Next.js projects*/}
            </h1>
            
            <p className="hero-description">
              Currently pursuing <b>Bachelor of Technology degree</b> from GGSIPU!!
              
              Bringing your ideas to life with clean, efficient, and scalable code. 
              Whether it's building web apps, optimizing performance, or solving 
              complex technical challenges.
            </p>
            
            <div className="hero-buttons">
              {/* <button className="btn-primary">Contact me</button> */}
              <a href="#project">
              <button className="btn-secondary">View projects</button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Skills />
    </div>
  );
}

export default About;