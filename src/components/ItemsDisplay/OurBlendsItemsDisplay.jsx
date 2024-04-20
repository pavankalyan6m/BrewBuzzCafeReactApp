import React from "react";
import { useOurBlends } from "../StoreContext/OurBlendsContext";
import OurBlendsItems from "../OurBlendsItems/OurBlendsItems";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { fadeIn } from "../Variants"; // Import fadeIn variant
import "./OurBlendsItemsDisplay.css"; // Reuse the same CSS file as ItemsDisplay for consistent styling

const OurBlendsItemsDisplay = () => {
  const { ourBlends } = useOurBlends(); // Get the list of our blends from the context

  if (!ourBlends || ourBlends.length === 0) {
    return <div>Loading...</div>; // Display loading message if our blends data is not available yet
  }

  return (
    <div className="ourblends-items-display" id="our-blends-display-section">
      {" "}
      {/* Reuse the same class for consistent styling */}
      <h2>Discover Our Unique Blends</h2>
      <motion.div className="ourblends-items-display-list">
        {" "}
        {/* Reuse the same class for consistent styling */}
        {ourBlends.map((blend, index) => (
          <motion.div key={index}>
            <OurBlendsItems // Render OurBlendsItems component for each blend
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{
                once: false,
                amount: 0.7,
              }}
              id={blend.id}
              name={blend.name}
              description={blend.description}
              price={blend.price}
              imagePath={blend.imagePath}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default OurBlendsItemsDisplay;
