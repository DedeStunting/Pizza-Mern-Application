import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { getAllPizzas, deletePizza } from '../actions/pizzaActions';
import Loading from '../components/Loading';
import Error from '../components/Error';

export default function Pizzaslist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pizzasstate = useSelector((state) => state.getAllPizzasReducer);
  const { pizzas, error, loading } = pizzasstate;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  if (error?.includes('Not authorized') || error?.includes('Admin')) {
    navigate('/');
    return null;
  }

  return (
    <div>
      <h2>Pizzas List</h2>
      {loading && <Loading />}
      {error && <Error error={error} />}

      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Prices</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pizzas?.map((pizza) => (
            <tr key={pizza._id}>
              <td>{pizza.name}</td>
              <td>
                Small: {pizza.prices[0].small}
                <br />
                Medium: {pizza.prices[0].medium}
                <br />
                Large: {pizza.prices[0].large}
              </td>
              <td>{pizza.category}</td>
              <td>
                <FaTrash
                  className="m-2"
                  role="button"
                  aria-label="Delete pizza"
                  onClick={() => dispatch(deletePizza(pizza._id))}
                />
                <Link to={`/admin/editpizza/${pizza._id}`}>
                  <FaEdit aria-label="Edit pizza" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
