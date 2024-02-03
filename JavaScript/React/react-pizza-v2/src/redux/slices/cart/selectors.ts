import { RootState } from "../../store";
import { CartInterface, CartItemInterface } from "./types";

export const cartSelector = (state: RootState): CartInterface => state.cart;

export const selectCartItemById = (id: string) => (state: RootState): CartItemInterface => state.cart.items.find((obj: CartItemInterface) => obj.id === id);