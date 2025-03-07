import DishForm from "../../components/DishForm/DishForm.tsx";
import { DishMutation} from "../../types";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectCreateDishLoading} from "../../store/dishes/dishesSlice.ts";
import {createDish} from "../../store/dishes/dishesThunks.ts";


const NewDish = () => {
    const navigate = useNavigate();
    const createDishLoading = useAppSelector(selectCreateDishLoading)
    const dispatch = useAppDispatch();

    const onCreateDish = async (newDish: DishMutation) => {
        await dispatch(createDish(newDish));
        navigate('/admin')
    };

    return (
        <div className="row">
            <div className="col">
                <DishForm onSubmitFormToAddDish={onCreateDish} isLoading={createDishLoading} />
            </div>
        </div>
    );
};

export default NewDish;