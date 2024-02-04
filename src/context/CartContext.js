import {useContext , createContext} from 'react';

export const CartContext = createContext({
   cart: '',
   setCart: () => []
}) 

export const useCartContext = () => useContext(CartContext);