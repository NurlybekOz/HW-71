import {useCallback, useEffect, useState} from "react";
import {ApiOrderList, Order} from "../../types";
import axiosApi from "../../axiosApi.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {useAppDispatch} from "../../app/hooks.ts";
import {deleteOrder} from "../../store/dishes/dishesThunks.ts";

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const fetchAllOrders = useCallback(async () => {
        try {
            setLoading(true);
            const responseOrders = await axiosApi<ApiOrderList | null>('/orders.json');
            const ordersObject = responseOrders.data;

            if (!ordersObject){
                return setOrders([])
            }

            const ordersArray = Object.keys(ordersObject).map(orderId => {
                const order = ordersObject[orderId]
                const totalPrice = order.dishes.reduce((acc, cartDish) => {
                    return acc + cartDish.amount * cartDish.dish.price;
                }, 150);

                return {
                    ...order,
                    id: orderId,
                    totalPrice,
                }
            })
            setOrders(ordersArray)

        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    }, [])


    useEffect(() => {
        void fetchAllOrders();
    }, [fetchAllOrders]);


    const handleCompleteOrder = async (orderId: string) => {
       try {
           await dispatch(deleteOrder(orderId))
           await fetchAllOrders();
       } catch (e) {
           console.log(e)
       }
    };

    return (
        <div className='row my-2'>
            <div className='col'>
                <h4>Orders</h4>
                {loading ? <Spinner /> :
                    <>
                        {orders.length > 0 ?
                            <>
                                {orders.map((order) => (
                                    <div key={order.id} className='card my-2' style={{ width: '35%' }}>
                                        <div className='card-body row gap-2'>
                                            <div className='d-flex flex-column'>
                                                <div>
                                                    {order.dishes.map(dish => (
                                                        <p className='m-1' key={dish.dish.id}>
                                                            {dish.amount} x {dish.dish.name}  <strong>{dish.dish.price * dish.amount} KGS</strong>
                                                        </p>
                                                    ))
                                                    }</div>
                                                <p className='m-1'>Delivery <strong>150 KGS</strong> </p>
                                            </div>
                                            <span>Order total: <strong>{order.totalPrice} KGS</strong> </span>
                                            <button type='button' className='btn btn-primary' onClick={() => handleCompleteOrder(order.id)}>Complete order</button>
                                        </div>
                                    </div>
                                ))}
                            </>
                            : <p>No orders yet</p>}
                    </>

                }
            </div>
        </div>
    );
};

export default Orders;