import React from "react";
import { motion } from "framer-motion";
import "./About.css";
import AboutVideo from "../../assets/videos/aboutVideo.mp4";

const About = () => {
  return (
    <div className="about-section" id="about-section">
      <div className="about">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Unveiling Our Cafe's Journey🌿☕︎
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Welcome to our cozy cafe! We strive to provide a warm and inviting
          atmosphere where you can relax and enjoy delicious coffee, pastries,
          and more.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Experience the authenticity of our coffee making process, sourced
          directly from Kerala's picturesque Munnar coffee plantations. Nestled
          atop the hills of Munnar, Kerala, our cafe offers a unique blend of
          flavors and aromas that are sure to delight your senses.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Visit us today and indulge in the rich heritage of Kerala's coffee
          culture, right here at our cafe on the scenic hills of Munnar.
        </motion.p>
      </div>
      <div className="about-video">
        <motion.video
          width="100%"
          height="400px"
          src={AboutVideo}
          title="Authentic Coffee Making"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          autoPlay
          muted
          loop // Add loop attribute to enable infinite loop
        ></motion.video>
      </div>
    </div>
  );
};

export default About;
