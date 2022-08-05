import { createContext, useState } from "react";
import PRODUCTS from "../shop-data.json";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };

  //   useEffect(() => {
  //     const unsubscribe = onAuthStateChangedListener((user) => {
  //       if (user) {
  //         createUserDocmentFromAuth(user);
  //       }
  //       setCurrentUser(user);
  //     });
  //     return unsubscribe;
  //   }, []);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
