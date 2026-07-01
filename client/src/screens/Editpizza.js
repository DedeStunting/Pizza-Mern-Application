import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPizzaById } from '../actions/pizzaActions';
import { editPizza } from '../actions/pizzaActions';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Success from '../components/Success';

export default function Editpizza() {
  const dispatch = useDispatch();
  const { pizzaid } = useParams(); // Get the pizza ID from the URL

  const [name, setname] = useState('');
  const [smallprice, setsmallprice] = useState('');
  const [mediumprice, setmediumprice] = useState('');
  const [largeprice, setlargeprice] = useState('');
  const [image, setimage] = useState('');
  const [description, setdescription] = useState('');
  const [category, setcategory] = useState('');

  const getpizzabyidstate = useSelector((state) => state.getPizzaByIdReducer);
  const { pizza, error, loading } = getpizzabyidstate;

  const editpizzastate = useSelector((state) => state.editPizzaReducer);
  const { success: editsuccess } = editpizzastate;

  useEffect(() => {
    if (pizzaid) {
      dispatch(getPizzaById(pizzaid)); // Dispatch action to fetch pizza by ID
    }
  }, [dispatch, pizzaid]);

  useEffect(() => {
    if (pizza) {
      // Set the state with pizza details once fetched
      setname(pizza.name || '');
      setsmallprice(pizza.prices[0]?.small || '');
      setmediumprice(pizza.prices[0]?.medium || '');
      setlargeprice(pizza.prices[0]?.large || '');
      setimage(pizza.image || '');
      setdescription(pizza.description || '');
      setcategory(pizza.category || '');
    }
  }, [pizza]);

  function formHandler(e) {
    e.preventDefault();

    const editedPizza = {
      _id: pizzaid,
      name,
      image,
      description,
      category,
      prices: [
        {
          small: smallprice,
          medium: mediumprice,
          large: largeprice,
        },
      ],
    };

    console.log('Edited Pizza:', editedPizza);
    // You can dispatch an action to update the pizza in the backend here
    dispatch(editPizza(editedPizza));
  }

  return (
    <div>
      <h1>Edit Pizza</h1>
      <h1>Pizza Id = {pizzaid}</h1>
      <div className="text-start">
        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {editsuccess && (<Success success='Pizza details edited successfully'/>)}
        
        {!loading && !error && (
          <form onSubmit={formHandler}>
            <input
              className="form-control"
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <input
              className="form-control"
              type="text"
              placeholder="small variant price"
              value={smallprice}
              onChange={(e) => setsmallprice(e.target.value)}
            />
            <input
              className="form-control"
              type="text"
              placeholder="medium variant price"
              value={mediumprice}
              onChange={(e) => setmediumprice(e.target.value)}
            />
            <input
              className="form-control"
              type="text"
              placeholder="large variant price"
              value={largeprice}
              onChange={(e) => setlargeprice(e.target.value)}
            />
            <input
              className="form-control"
              type="text"
              placeholder="category"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
            />
            <input
              className="form-control"
              type="text"
              placeholder="description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
            <input
              className="form-control"
              type="text"
              placeholder="image url"
              value={image}
              onChange={(e) => setimage(e.target.value)}
            />
            <button className="btn mt-3" type="submit">
              Update Pizza
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
