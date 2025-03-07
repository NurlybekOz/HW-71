import CartItem from "./CartItem/CartItem.tsx";
import {CartDish} from "../../types";

interface Props {
    cartDishes: CartDish[];
}

const CartDishes: React.FC<Props> = ({cartDishes}) => {

    const total = cartDishes.reduce((acc, cartDish) => {
        return acc + cartDish.dish.price * cartDish.amount;
    }, 150);

    return (
        <>
            {cartDishes.map((cartDish) => (
                <CartItem key={cartDish.dish.id} cartDish={cartDish}/>
            ))}

            <hr/>
            <div className="card border-0 p-2">
                <div className="row">
                    <div className="d-flex flex-column">
                        <div className='d-flex justify-content-between'>Delivery <span><strong>150 </strong>KGS</span> </div>
                        <div className='d-flex justify-content-between'>Total: <span><strong>{total} </strong>KGS</span> </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default CartDishes;