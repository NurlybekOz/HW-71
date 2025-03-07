import {CartDish} from "../../../types";
import {useAppDispatch} from "../../../app/hooks.ts";
import {deleteDishFromCart} from "../../../store/cart/cartSlice.ts";


interface Props {
    cartDish: CartDish;
}

const CartItem: React.FC<Props> = ({cartDish}) => {
    const dispatch = useAppDispatch();
    const price = cartDish.dish.price * cartDish.amount;
    const onDeleteDish = () => {
        dispatch(deleteDishFromCart(cartDish.dish.id));
    };
    return (
        <div className='d-flex justify-content-between align-items-center'>
            <div>{cartDish.amount} x {cartDish.dish.name}</div>
            <div><strong>{price} KGS</strong><button type='button' className='btn ' onClick={onDeleteDish} >X</button></div>
        </div>

    );
};

export default CartItem;