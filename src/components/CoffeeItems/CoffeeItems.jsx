import React, { useState } from "react";
import { motion } from "framer-motion";
import "./CoffeeItems.css";
import { assets } from "../../assets/assets";
import LazyLoad from "react-lazyload";

const CoffeeItems = ({ name, description, price, imagePath }) => {
  const [selectedSize, setSelectedSize] = useState("regular");
  const [newSizePrice, setNewSizePrice] = useState(price);
  const [itemCount, setItemCount] = useState(0); // State for item count
  const [isHovered, setIsHovered] = useState(false);

  // Function to handle size selection for a menu item
  const handleSizeSelection = (size, priceFactor) => {
    // Toggle selection state
    setSelectedSize((prevSize) => (prevSize === size ? "regular" : size));

    // Update price if necessary
    const newPrice = selectedSize === size ? price : price * priceFactor;
    setNewSizePrice(newPrice);
  };

  // Function to handle increment and decrement of item count
  const handleIncrement = () => {
    setItemCount((prev) => prev + 1); // Increase count by 1
  };

  const handleDecrement = () => {
    setItemCount((prev) => Math.max(prev - 1, 0)); // Decrease count by 1, with minimum of 0
  };

  return (
    <div className="coffee-item">
      <LazyLoad height={200} once>
        <div
          className="coffee-image-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.img
            className="coffee-item-image"
            src={`/CofeeItems/${imagePath}.webp`}
            alt={name}
            whileHover={{ scale: 1.1 }}
          />
          {isHovered && (
            <div className="coffee-item-desc-container">
              <motion.p
                className="coffee-item-desc"
                initial={{ opacity: 0, y: 20 }} // Adjust initial position and animation direction
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {description}
              </motion.p>
            </div>
          )}
          {itemCount === 0 ? (
            // Render add icon only if count is 0
            <img
              className="add"
              src={assets.add_icon_white}
              alt="Add to Cart"
              onClick={handleIncrement} // Call handleIncrement when the '+' button is clicked
            />
          ) : (
            // Render count instead of add icon when count is greater than 0
            <div className="count-container">
              <img
                onClick={() => setItemCount((prev) => prev - 1)}
                src={assets.minus_with_count}
                alt=""
              />
              <p className="count">{itemCount}</p>
              <img
                onClick={() => setItemCount((prev) => prev + 1)}
                src={assets.add_with_count}
                alt=""
              />
            </div>
          )}
        </div>
      </LazyLoad>
      <div className="coffee-item-info">
        <div className="coffee-item-name-rating">
          <p style={{ fontWeight: "bold" }}>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p style={{ fontWeight: "bold" }} className="coffee-item-price">
          ${newSizePrice}
        </p>
        <p style={{ fontWeight: "500" }}>Size Up Your Sips!</p>
        <div className="size-selection">
          <button
            className={selectedSize === "regular" ? "selected" : ""}
            onClick={() => handleSizeSelection("regular", 1.0)}
          >
            Regular
          </button>
          <button
            className={selectedSize === "medium" ? "selected" : ""}
            onClick={() => handleSizeSelection("medium", 1.5)}
          >
            Medium
          </button>
          <button
            className={selectedSize === "large" ? "selected" : ""}
            onClick={() => handleSizeSelection("large", 2.0)}
          >
            Large
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeItems;
