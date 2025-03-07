export interface Dish {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
}

export interface ApiDish {
    name: string;
    imageUrl: string;
    price: number;
}

export interface DishesListApi {
    [id: string]: ApiDish;
}

export interface DishMutation {
    name: string;
    imageUrl: string;
    price: number;
}

export interface CartDish {
    dish: Dish;
    amount: number;
}

export interface ApiOrder {
    dishes: CartDish[];
}

export interface ApiOrderList {
    [id: string]: ApiOrder;
}
export interface Order extends ApiOrder {
    id: string;
    totalPrice: number;
}