
import {createSlice} from "@reduxjs/toolkit";
import {ApiDish, Dish} from "../../types";
import {
    createDish,
    deleteDish,
    deleteOrder,
    fetchDishes,
    fetchOneDishById,
    updateDish
} from "./dishesThunks.ts";
import {RootState} from "../../app/store.ts";


interface DishesState {
    items: Dish[];
    fetchLoading: boolean;
    fetchOneLoading: boolean;
    deleteLoading: boolean | string;
    creatingLoading: boolean;
    updateLoading: boolean;
    oneDish: ApiDish | null;
}

const initialState: DishesState = {
    items: [],
    fetchLoading: false,
    fetchOneLoading: false,
    deleteLoading: false,
    creatingLoading: false,
    updateLoading: false,
    oneDish: null,
}

export const selectDishes = (state: RootState) => state.dishes.items;
export const selectFetchDishesLoading = (state: RootState) => state.dishes.fetchLoading;
export const selectDeleteDishesLoading = (state: RootState) => state.dishes.deleteLoading;
export const selectCreateDishLoading = (state: RootState) => state.dishes.creatingLoading;
export const selectUpdateDishLoading = (state: RootState) => state.dishes.updateLoading;
export const selectOneDish = (state: RootState) => state.dishes.oneDish;
export const selectFetchOneDishLoading = (state: RootState) => state.dishes.fetchOneLoading;



const dishesSlice = createSlice({
    name: "dishes",
    initialState,
    reducers: {
        clearOneDish: (state) => {
            state.oneDish = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDishes.pending, (state) => {
            state.fetchLoading = true
        }).addCase(fetchDishes.fulfilled, (state, {payload: dishes}) => {
            state.fetchLoading = false
            state.items = dishes;
        }).addCase(fetchDishes.rejected, (state) => {
            state.fetchLoading = false
        })

            .addCase(fetchOneDishById.pending, (state) => {
                state.fetchOneLoading = true;
                state.oneDish = null;
            }).addCase(fetchOneDishById.fulfilled, (state, {payload: dish}) => {
            state.fetchOneLoading = false
            state.oneDish = dish;
        }).addCase(fetchOneDishById.rejected, (state) => {
            state.fetchOneLoading = false
            state.oneDish = null
        })

            .addCase(deleteDish.pending, (state, {meta}) => {
            state.deleteLoading = meta.arg;
        }).addCase(deleteDish.fulfilled, (state) => {
            state.deleteLoading = false
        }).addCase(deleteDish.rejected, (state) => {
            state.deleteLoading = false
        })

            .addCase(createDish.pending, (state) => {
            state.creatingLoading = true
        }).addCase(createDish.fulfilled, (state) => {
            state.creatingLoading = false
        }).addCase(createDish.rejected, (state) => {
            state.creatingLoading = false
        })
            .addCase(updateDish.pending, (state) => {
            state.updateLoading = true
        }).addCase(updateDish.fulfilled, (state) => {
            state.updateLoading = false
        }).addCase(updateDish.rejected, (state) => {
            state.updateLoading = false
        })

            .addCase(deleteOrder.pending, (state) => {
                state.deleteLoading = true
            }).addCase(deleteOrder.fulfilled, (state) => {
            state.deleteLoading = false
        }).addCase(deleteOrder.rejected, (state) => {
            state.deleteLoading = false
        })
    }
})

export const dishesReducer = dishesSlice.reducer;
export const {clearOneDish} = dishesSlice.actions;