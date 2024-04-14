import React from "react";
import { useStore } from "../StoreContext/StoreContext";
import CoffeeItems from "../CoffeeItems/CoffeeItems";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { fadeIn } from "../Variants"; // Import fadeIn variant
import "./ItemsDisplay.css";

const ItemsDisplay = () => {
  const store = useStore();
  const items_list = store.items_list;

  if (!items_list || items_list.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="items-display" id="items-display-section">
      <h2>Taste the Experience: Explore the Brews</h2>
      <motion.div className="items-display-list">
        {items_list.map((item, index) => (
          <motion.div key={index}>
            <CoffeeItems
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{
                once: false,
                amount: 0.7,
              }}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price} // Pass the new price as prop
              imagePath={item.imagePath}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ItemsDisplay;
