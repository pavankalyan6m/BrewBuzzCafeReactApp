import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [items_list, setItemsList] = useState([]);
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
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:8080/menu/get/all", {
          // Ensure browser caching for images
          headers: {
            "Cache-Control": "max-age=604800", // Cache images for 7 days (adjust as needed)
          },
        });
        const menuItems = response.data.map((item) => ({
          ...item,
          selectedSize: "regular",
          selectedPriceFactor: 1.0,
        }));
        setItemsList(menuItems);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  const contextValue = {
    items_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
