import "./Footer.css"
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer(){

  return(

    <footer className="footer">

      <div className="footer-container">

        <p>© 2026 Gaurav Kumar Singh</p>

        <div className="social-icons">

          <a href="https://github.com/GauravSingh5829/GauravSingh5829"><FaGithub/></a>
          <a href="https://www.linkedin.com/in/gaurav-kumar-singh-raj5829/"><FaLinkedin/></a>
          <a href="https://www.instagram.com/rajsingh_58/?hl=en"><FaInstagram/></a>

        </div>

      </div>

    </footer>

  )

}

export default Footer;