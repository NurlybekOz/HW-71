import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {ApiDish, Dish, DishesListApi, DishMutation} from "../../types";

export const fetchDishes = createAsyncThunk<Dish[], void>(
    'dishes/fetchAllDishes',
    async () => {
        const response = await axiosApi<DishesListApi | null>('/dishes.json');
        const dishesListObject = response.data;

        if (!dishesListObject) {
            return [];
        } else {
           return Object.keys(dishesListObject).map((dishId) => {
                const dish = dishesListObject[dishId];
                return {
                    ...dish,
                    id: dishId,
                };
            });
        }
    }
);
export const fetchOneDishById = createAsyncThunk<ApiDish, string>(
    'dishes/fetchOneDishById',
    async (dish_id) => {
        const response = await axiosApi.get<ApiDish | null>(`dishes/${dish_id}.json`)
        const dish = response.data;
        if (!dish) {
            throw new Error ('Not found')
        }
        return dish;
    }
)
export const updateDish = createAsyncThunk<void, {id: string, dish: ApiDish}>(
    'dishes/updateDish',
    async ({id, dish}) => {
        await axiosApi.put(`dishes/${id}.json`, dish);
    }
)
export const createDish = createAsyncThunk<void, DishMutation>(
    'dishes/createDish',
    async (dishToCreate) => {
        await axiosApi.post(`dishes.json`, dishToCreate);
    }
)

export const deleteDish = createAsyncThunk<void, string>(
    'dishes/deleteDish',
    async (dishId) => {
        await axiosApi.delete(`dishes/${dishId}.json`);
    }
)

export const deleteOrder = createAsyncThunk<void, string>(
    'orders/deleteOrder',
    async (orderId: string) => {
        await axiosApi.delete(`/orders/${orderId}.json`);
    }
);
