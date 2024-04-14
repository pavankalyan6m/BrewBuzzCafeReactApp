import React from "react";
import { motion } from "framer-motion";

const TypeEffect = ({ text }) => {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <React.Fragment key={index}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 2 + index * 0.2 }} // Adjusted transition duration
          >
            {word}
          </motion.span>
          &nbsp;
        </React.Fragment>
      ))}
    </>
  );
};

export default TypeEffect;
