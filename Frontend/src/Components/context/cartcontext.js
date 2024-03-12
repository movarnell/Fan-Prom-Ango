import { createContext } from "react";

export const CartContext = createContext({
    cart: [],
    setCart: () => {},

    cartTimer: 0,
    setCartTimer: () => {},

    timerRunning: false,
    setTimerRunning: () => {},
});