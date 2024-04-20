import React, { useState, useEffect } from "react";
import "./NavBar.css";
import logo from "../../assets/logo_main.png";
import { IoIosCart } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { motion } from "framer-motion"; // Import motion for animation

const NavBar = ({ theme, setTheme }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [menu, setMenu] = useState("");
  const [floating, setFloating] = useState(false); // State for floating navbar

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setFloating(scrollTop > 200); // Update floating state based on scroll position
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
  };

  const handleDiscoverBrewsClick = () => {
    const exploreMenuSection = document.getElementById("items-display-section");
    if (exploreMenuSection) {
      exploreMenuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDiscoverOurBlendsClick = () => {
    const ourBlendsSection = document.getElementById(
      "our-blends-display-section"
    );
    if (ourBlendsSection) {
      ourBlendsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleAboutClick = () => {
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div // Apply animation to navbar
      className={`navbar ${floating ? "floating" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={logo} alt="" className="logo" />
      <ul className="navbar-menu">
        <li
          onMouseEnter={() => setMenu("about")}
          className={menu === "about" ? "active" : ""}
          onClick={handleAboutClick}
        >
          About
        </li>
        <li
          onMouseEnter={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
          onClick={handleDiscoverBrewsClick}
        >
          Discover Brews
        </li>
        <li
          onMouseEnter={() => setMenu("products")}
          className={menu === "products" ? "active" : ""}
          onClick={handleDiscoverOurBlendsClick}
        >
          Our Blends
        </li>
        <li
          onMouseEnter={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile-App
        </li>
        <li
          onMouseEnter={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </li>
      </ul>
      <div className="navbar-right">
        <div style={{ display: "flex", alignItems: "center" }}>
          {searchVisible && (
            <input
              type="text"
              placeholder="what's brewing??"
              style={{
                width: "170px",
                height: "25px",
                marginRight: "5px",
                padding: "2px",
                borderRadius: "2%",
              }}
            />
          )}
          <IoMdSearch
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
            onClick={handleSearchClick}
          />
        </div>
        <div className="navbar-search-icon">
          <IoIosCart style={{ fontSize: "18px", position: "relative" }} />
          <div className="dot"></div>
        </div>

        <button>Sign in</button>
      </div>
    </motion.div>
  );
};

export default NavBar;
