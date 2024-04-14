import React, { useState, useEffect } from "react";
import "./Header.css";
import { motion } from "framer-motion";
import { fadeIn } from "../Variants";

// Custom hook for typing effect
const useTypingEffect = (text, typingInterval) => {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const textChars = text.split("");
    let timeoutId;

    const typeNextChar = () => {
      if (currentIndex < textChars.length) {
        setTypedText((prevText) => prevText + textChars[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
        timeoutId = setTimeout(typeNextChar, typingInterval);
      }
    };

    // Start typing when component mounts
    timeoutId = setTimeout(typeNextChar, typingInterval);

    // Clear timeout and reset index when component unmounts
    return () => clearTimeout(timeoutId);
  }, [text, typingInterval, currentIndex]);

  return typedText;
};

export const Header = () => {
  const text =
    "Shh! Heard the buzz? Our caffeine concoction packs a bigger punch than Walter White's secret stash. Say hello to Caffeine, your ultimate flavor thrill ride and dreamy escape!...";
  const typingInterval = 30;

  // Use custom hook for typing effect
  const typedText = useTypingEffect(text, typingInterval);

  const [showMenu, setShowMenu] = useState(false); // State to control rendering of ExploreMenu

  const handleScrollToMenu = () => {
    const exploreMenuSection = document.getElementById("items-display-section");
    exploreMenuSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      className="header"
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{
        once: false,
        amount: 0.7,
      }}
    >
      <div className="header-contents">
        <h2>Discover Our Secret Formula!..</h2>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          {typedText}
        </motion.h3>
        <button onClick={handleScrollToMenu}>View Menu</button>
      </div>
    </motion.div>
  );
};
