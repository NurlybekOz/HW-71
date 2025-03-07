
import {useNavigate, useParams} from "react-router-dom";
import {DishMutation} from "../../types";
import DishForm from "../../components/DishForm/DishForm.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {clearOneDish, selectUpdateDishLoading} from "../../store/dishes/dishesSlice.ts";
import {updateDish} from "../../store/dishes/dishesThunks.ts";
import {useEffect} from "react";

const EditDish = () => {
    const navigate = useNavigate();
    const updateLoading = useAppSelector(selectUpdateDishLoading)
    const { idDish } = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(clearOneDish())
    }, [dispatch]);

    const onEditDish = async (dishToUpdate: DishMutation) => {
        if (idDish) {
            await dispatch(updateDish({id: idDish, dish: dishToUpdate}));
            navigate('/admin')
        }

    };

    return (
        <div className="row">
            <div className="col">
                <DishForm onSubmitFormToAddDish={onEditDish} idDish={idDish} isEdit isLoading={updateLoading}/>
            </div>
        </div>
    );
};

export default EditDish;