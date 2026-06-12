import "./Services.css"
import { FaCode, FaPalette, FaLaptopCode, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const serviceVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

function Services(){

  const servicesList = [
    {
      id: 1,
      icon: <FaCode className="service-icon"/>,
      title: "Frontend Development",
      desc: "I build modern and interactive websites using React, HTML, CSS, JavaScript, Node.Js, Php, MySql and Next.js."
    },
    {
      id: 2,
      icon: <FaPalette className="service-icon"/>,
      title: "UI Design",
      desc: "Creating clean and modern user interfaces with focus on design and usability."
    },
    {
      id: 3,
      icon: <FaLaptopCode className="service-icon"/>,
      title: "Web Applications",
      desc: "Building modern web applications with dynamic features and smooth performance."
    }
  ];

  return(
    <div className="services" id="serv">

      <div className="title">
        <h2>Services</h2>
      </div>

      <motion.div 
        className="services-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {servicesList.map((service) => (
          <motion.div className="service-card" variants={serviceVariants} key={service.id}>
            <div className="shine-sweep"></div>
            <div className="icon-wrapper">
              {service.icon}
            </div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
            <div className="service-footer">
              <span className="learn-more">Learn more</span>
              <FaArrowRight className="learn-more-arrow" />
            </div>
          </motion.div>
        ))}
      </motion.div>

    </div>
  )

}

export default Services;