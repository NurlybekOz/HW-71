import DishItem from "./DishItem/DishItem.tsx";
import {ApiOrder, Dish} from "../../types";
import * as React from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {clearCart, selectCartDishes} from "../../store/cart/cartSlice.ts";
import Modal from "../UI/Modal/Modal.tsx";
import CartDishes from "../Cart/CartDishes.tsx";
import {FormEvent} from "react";
import axiosApi from "../../axiosApi.ts";
import Spinner from "../UI/Spinner/Spinner.tsx";

interface Props {
    dishes: Dish[];
    onDeleteClick: (id: string) => void;
    deleteLoading: string | boolean;
}

const Dishes: React.FC<Props> = ({ dishes, deleteLoading, onDeleteClick }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [totalPrice, setTotalPrice] = React.useState<number>(0);
    const [loading, setLoading] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const cartDishes = useAppSelector(selectCartDishes);
    const dispatch = useAppDispatch();

    const handleDishAdd = (dish: Dish) => {
        setTotalPrice((prevTotal) => prevTotal + dish.price);
    };

    const isAdmin = location.pathname.startsWith("/admin");

    const handleCheckoutClick = () => {
        if (cartDishes.length > 0) {
            setShowModal(true);
        }

    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const onClearCart = () => {
        dispatch(clearCart());
    };

    const onFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const order: ApiOrder = {
            dishes: cartDishes
        };

        try {
            await axiosApi.post('/orders.json', order);
            dispatch(clearCart());
            setTotalPrice(0)
            handleCloseModal();
        } catch (e) {
            alert(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between mb-2">
                <h4>Dishes</h4>
                {isAdmin && (
                    <button type="button" className="btn btn-primary" onClick={() => navigate('/admin/new-dish')}>
                        Add new dish
                    </button>
                )}
            </div>
            {dishes.length === 0 ? (
                <p>No dishes yet</p>
            ) : (
                <>
                    {dishes.map((dish) => (
                        <DishItem
                            key={dish.id}
                            deleteLoading={deleteLoading}
                            dish={dish}
                            onDeleteClick={() => onDeleteClick(dish.id)}
                            onDishAdd={handleDishAdd}
                        />
                    ))}
                </>
            )}
            <div className="d-flex gap-2 align-items-center">
                <strong>Order Total: {totalPrice} KGS</strong>
                <button className="btn btn-success" onClick={handleCheckoutClick}>
                    Checkout
                </button>
            </div>

            <Modal show={showModal} onClose={handleCloseModal}>
                <form onSubmit={onFormSubmit} className="row mt-2">
                    <div className="col-8 m-auto">
                        <div>
                            {cartDishes.length === 0 ? (
                                <p>No dishes in the cart.</p>
                            ) : (
                                <CartDishes cartDishes={cartDishes}/>
                            )}
                        </div>
                        <div className="d-flex gap-2">
                            <button className="btn btn-danger" onClick={onClearCart}>Cancel</button>
                            <button className="btn btn-primary" type="submit" disabled={loading}>
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    "Order"
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default Dishes;
