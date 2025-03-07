import {useCallback, useEffect, useState} from "react";
import { DishMutation} from "../../types";
import Spinner from "../UI/Spinner/Spinner.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {fetchOneDishById} from "../../store/dishes/dishesThunks.ts";
import {selectFetchOneDishLoading, selectOneDish} from "../../store/dishes/dishesSlice.ts";


interface Props {
    onSubmitFormToAddDish: (newDish: DishMutation) => void;
    idDish?: string;
    isEdit?: boolean;
    isLoading?: boolean;
}

const initialForm = {
    name: '',
    imageUrl: '',
    price: 0,
}

const DishForm: React.FC<Props> = ({onSubmitFormToAddDish, idDish, isEdit = false}) => {
    const dispatch = useAppDispatch();
    const oneDish = useAppSelector(selectOneDish);
    const fetchOneDishLoading = useAppSelector(selectFetchOneDishLoading);
    const [form, setForm] = useState<DishMutation>(initialForm);

    const fetchOneDish = useCallback(async (id: string | undefined) => {
       if (id) {
           await dispatch(fetchOneDishById(id))

       }

    }, [dispatch])

    useEffect(() => {
        setForm(initialForm)
        if (oneDish === null && idDish) {
            void fetchOneDish(idDish);
            setForm(initialForm);
        } else if (oneDish && idDish) {
            setForm(oneDish)
        }
    }, [fetchOneDish, oneDish, idDish])

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, name} = e.target;
        setForm(prevState => ({...prevState, [name]: value}));
    };


    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmitFormToAddDish({...form, price: Number(form.price)});
    };

    return (
        <>
            {fetchOneDishLoading ? <Spinner/> :

                <>

                        <form onSubmit={onSubmit}>
                            <h4>{isEdit ? 'Edit' : 'Add new'} dish</h4>
                            <hr/>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    value={form.name}
                                    onChange={inputChangeHandler}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="imageUrl">Image url</label>
                                <input
                                    type="text"
                                    id="imageUrl"
                                    name="imageUrl"
                                    className="form-control"
                                    value={form.imageUrl}
                                    onChange={inputChangeHandler}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input
                                    type="number"
                                    min={0}
                                    id="price"
                                    name="price"
                                    className="form-control"
                                    value={form.price}
                                    onChange={inputChangeHandler}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary mt-4">{isEdit ? 'Edit' : 'Add'}</button>
                        </form>

                </>

            }
        </>

    );
};

export default DishForm;