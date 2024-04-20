import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import "./OurBlendsItems.css";
import LazyLoad from "react-lazyload";
import { assets } from "../../assets/assets";
import { OurBlendsContext } from "../StoreContext/OurBlendsContext"; // Import the context

const OurBlendsItems = ({ name, description, imagePath, price }) => {
  const [selectedSize, setSelectedSize] = useState("regular");
  const [newSizePrice, setNewSizePrice] = useState(price);
  const [itemCount, setItemCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const ourBlendsContext = useContext(OurBlendsContext);
  const { addToCart } = ourBlendsContext;

  const handleSizeSelection = (size, priceFactor) => {
    // Toggle selection state
    setSelectedSize((prevSize) => (prevSize === size ? "regular" : size));

    // Update price if necessary
    const newPrice = selectedSize === size ? price : price * priceFactor;
    setNewSizePrice(newPrice);
  };

  const handleIncrement = () => {
    setItemCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setItemCount((prevCount) => Math.max(prevCount - 1, 0));
  };

  const handleAddToCart = () => {
    addToCart({
      id: Math.random(), // Generate a random ID for the item
      name,
      price: newSizePrice,
      size: selectedSize,
    });
    setItemCount((prevCount) => prevCount + 1); // Increment item count after adding to cart
  };

  return (
    <div className="our-blends-item">
      <LazyLoad height={200} once>
        <div
          className="our-blends-image-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.img
            className="our-blends-item-image"
            src={`/OurblendsItems/${imagePath}.webp`}
            alt={name}
            whileHover={{ scale: 1.1 }}
          />
          {isHovered && (
            <div className="our-blends-item-desc-container">
              <motion.p
                className="our-blends-item-desc"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {description}
              </motion.p>
            </div>
          )}
          {itemCount === 0 ? (
            <img
              className="add"
              src={assets.add_icon_white}
              alt="Add to Cart"
              onClick={handleAddToCart}
            />
          ) : (
            <div className="count-container">
              <img
                onClick={handleDecrement}
                src={assets.minus_with_count}
                alt=""
              />
              <p className="count">{itemCount}</p>
              <img
                onClick={handleIncrement}
                src={assets.add_with_count}
                alt=""
              />
            </div>
          )}
        </div>
      </LazyLoad>
      <div className="our-blends-item-info">
        <div className="our-blends-item-name-rating">
          <p style={{ fontWeight: "bold" }}>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p style={{ fontWeight: "bold" }} className="our-blends-item-price">
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

export default OurBlendsItems;
