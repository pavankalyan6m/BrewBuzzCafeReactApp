import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const OurBlendsContext = createContext(null);

export const OurBlendsProvider = ({ children }) => {
  const [ourBlends, setOurBlends] = useState([]);
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  useEffect(() => {
    const fetchOurBlends = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/ourblends/get/all",
          {
            // Ensure browser caching for images
            headers: {
              "Cache-Control": "max-age=604800", // Cache images for 7 days (adjust as needed)
            },
          }
        );
        console.log("Response data:", response.data); // Log response data

        const ourBlendsData = response.data.map((item) => ({
          ...item,
          selectedSize: "regular",
          selectedPriceFactor: 1.0,
        }));
        setOurBlends(ourBlendsData);
      } catch (error) {
        console.error("Error fetching our blends:", error);
      }
    };

    fetchOurBlends();
  }, []);

  const contextValue = {
    ourBlends,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <OurBlendsContext.Provider value={contextValue}>
      {children}
    </OurBlendsContext.Provider>
  );
};

export const useOurBlends = () => useContext(OurBlendsContext);
