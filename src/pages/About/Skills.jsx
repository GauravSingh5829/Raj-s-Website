import "./Skills.css";
import { SiVercel } from "react-icons/si";
import { FaServer } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import {
FaHtml5,
FaCss3Alt,
FaJs,
FaReact,
FaGitAlt,
FaGithub,
FaFigma,
FaNodeJs,
FaJava
} from "react-icons/fa";

import {
SiUnity,
SiTailwindcss,
SiFirebase,
SiMongodb,
SiExpress,
SiMysql,
SiPhp
} from "react-icons/si";

function Skills(){

const skills = [
  { icon: <FaHtml5/>, name: "HTML" },
  { icon: <FaCss3Alt/>, name: "CSS" },
  { icon: <FaJs/>, name: "JavaScript" },
  { icon: <FaReact/>, name: "React" },
  { icon: <FaJava/>, name: "Java" },
  { icon: <SiMysql/>, name: "MySQL" },
  { icon: <SiPhp/>, name: "PHP" },
  { icon: <FaNodeJs/>, name: "Node" },
  { icon: <SiExpress/>, name: "Express" },
  { icon: <SiMongodb/>, name: "MongoDB" },
  { icon: <FaGitAlt/>, name: "Git" },
  { icon: <FaGithub/>, name: "GitHub" },
  { icon: <FaFigma/>, name: "Figma" },
  { icon: <SiUnity/>, name: "Unity" },
  { icon: <SiTailwindcss/>, name: "Tailwind" },
  { icon: <SiFirebase/>, name: "Firebase" },
  { icon: <SiVercel/>, name: "Vercel" },
  { icon: <FaServer/>, name: "SSH/RDP" }
];

return(

<div className="skills">
<div className="skills-slider">
<div className="skills-track">

{[...skills, ...skills].map((skill, index) => (
  <div className="skill" key={index}>
    {skill.icon}
    <p>{skill.name}</p>
  </div>
))}

</div>
</div>
</div>

)

}

export default Skills;