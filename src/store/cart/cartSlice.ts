import {CartDish, Dish} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";


interface CartState {
    cartDishes: CartDish[];
}

const initialState: CartState = {
    cartDishes: [],
}

export const selectCartDishes = (state: RootState) => state.cart.cartDishes;


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addDish: (state, {payload: dish}: PayloadAction<Dish>) => {
            const exisitingIndex = state.cartDishes.findIndex(cartItem => {
                return cartItem.dish.id === dish.id;
            });

            if (exisitingIndex !== -1) {
                state.cartDishes[exisitingIndex].amount++;
            } else {
                state.cartDishes.push({dish, amount: 1});
            }
        },
        clearCart: (state) => {
            state.cartDishes = [];
        },
        deleteDishFromCart: (state, {payload: dishId}: PayloadAction<string>) => {
            const existingDishIndex = state.cartDishes.findIndex(cartDish => cartDish.dish.id === dishId);
            if (existingDishIndex !== -1) {
                const cartDish = state.cartDishes[existingDishIndex];
                if (cartDish.amount > 1) {
                    state.cartDishes[existingDishIndex].amount--;
                } else {
                    state.cartDishes.splice(existingDishIndex, 1);
                }
            }
        },
    }
})

export const cartReducer = cartSlice.reducer;
export const {addDish, clearCart, deleteDishFromCart} = cartSlice.actions;