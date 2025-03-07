import Dishes from "../../components/Dishes/Dishes.tsx";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {deleteDish, fetchDishes} from "../../store/dishes/dishesThunks.ts";
import {selectDeleteDishesLoading, selectDishes, selectFetchDishesLoading} from "../../store/dishes/dishesSlice.ts";


const Home = () => {
    const dispatch = useAppDispatch();
    const dishesLoading = useAppSelector(selectFetchDishesLoading);
    const dishesDeleteLoading = useAppSelector(selectDeleteDishesLoading);
   const dishes = useAppSelector(selectDishes);
    useEffect(() => {
        dispatch(fetchDishes());
    }, [dispatch]);
    const onDeleteDish = async (id: string) => {
       await dispatch(deleteDish(id))
       await dispatch(fetchDishes());

    }
    return (
        <>
            <div className="row mt-2">
                <div className="col-8">

                    {dishesLoading ? <Spinner/> :
                        <Dishes dishes={dishes} onDeleteClick={onDeleteDish} deleteLoading={dishesDeleteLoading} />
                    }
                </div>
            </div>

        </>

    );
};

export default Home;