import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPizzas } from '../actions/pizzaActions';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Pizza from '../components/Pizza';

export default function Homescreen() {
  const dispatch = useDispatch();
  const pizzasstate = useSelector((state) => state.getAllPizzasReducer);
  const { pizzas, error, loading } = pizzasstate;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  return (
    <div>
      <div className="row justify-content-center">
        {loading && <Loading />}
        {error && <Error error={error || 'Something went wrong'} />}
        {!loading &&
          !error &&
          pizzas?.map((pizza) => (
            <div className="col-md-4" key={pizza._id}>
              <Pizza pizza={pizza} />
            </div>
          ))}
      </div>
    </div>
  );
}
