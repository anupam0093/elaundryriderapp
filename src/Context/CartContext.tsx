// import React, { createContext, useContext, useState } from 'react';

// interface CartItem {
//   name: string;
//   price: number;
// }

// interface CartContextType {
//   cartItems: CartItem[];
//   addToCart: (item: CartItem) => void;
//   cartTotal: number;
//   cartCount: number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider: React.FC = ({ children }:any) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   const addToCart = (item: CartItem) => {
//     setCartItems([...cartItems, item]);
//   };

//   const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);
//   const cartCount = cartItems.length;

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, cartTotal, cartCount }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = (): CartContextType => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };
