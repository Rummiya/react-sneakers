import { useContext } from "react";
import AppContext from "../context";

export const useCart = () => {
    const { cartItem } = useContext(AppContext);
    const totalPrice = cartItem.reduce(( sum, obj) => Number(obj.price) + sum, 0);
    const taxPrice = Math.round(totalPrice * 0.05);

    return {cartItem, totalPrice, taxPrice}
}