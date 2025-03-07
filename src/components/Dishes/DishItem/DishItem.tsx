import { Dish } from "../../../types";
import { Link } from "react-router-dom";
import { addDish } from "../../../store/cart/cartSlice.ts";
import { useAppDispatch } from "../../../app/hooks.ts";
import Spinner from "../../UI/Spinner/Spinner.tsx";
import { useLocation } from "react-router-dom";

interface Props {
    dish: Dish;
    deleteLoading: string | boolean;
    onDeleteClick: React.MouseEventHandler;
    onDishAdd: (dish: Dish) => void;
}

const DishItem: React.FC<Props> = ({ dish, deleteLoading, onDeleteClick, onDishAdd }) => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    let imageUrl = 'https://i.pinimg.com/474x/1a/53/5d/1a535da18a4eac21f9d03d7df44d8243.jpg';

    if (dish.imageUrl) {
        imageUrl = dish.imageUrl;
    }

    const imageStyle = {
        width: '100px',
        height: '100px',
        background: `url(${imageUrl}) no-repeat center center / cover`,
    };

    const handleDishAdd = () => {
        dispatch(addDish(dish));
        onDishAdd(dish);
    };

    const isAdmin = location.pathname.startsWith("/admin");

    return (
        <div className="card mb-2 justify-content-center" style={{ height: '130px' }}>
            <div className="row justify-content-around align-items-center">
                <div className="col-sm-4 rounded-start" style={imageStyle} onClick={handleDishAdd} />
                <div className="col-sm-8">
                    <div className="card-body d-flex justify-content-between align-items-center">
                        <h5 className="card-title m-0">{dish.name}</h5>
                        <div className='d-flex justify-content-around align-items-center gap-3'>
                            <strong className="card-text m-0">{dish.price} KGS</strong>
                            {isAdmin && (
                                <div className='d-flex gap-2'>
                                    <Link to={`/admin/edit-dish/${dish.id}`} className="btn btn-secondary">Edit</Link>
                                    <button className="btn btn-danger" onClick={onDeleteClick}>
                                        Delete {deleteLoading && deleteLoading === dish.id && <Spinner />}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DishItem;
