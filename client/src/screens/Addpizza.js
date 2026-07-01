import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPizza } from '../actions/pizzaActions';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Success from '../components/Success';

export default function Addpizza() {
  const [name, setname] = useState('');
  const [smallprice, setsmallprice] = useState('');
  const [mediumprice, setmediumprice] = useState('');
  const [largeprice, setlargeprice] = useState('');
  const [image, setimage] = useState('');
  const [description, setdescription] = useState('');
  const [category, setcategory] = useState('');

  const dispatch = useDispatch();
  const addpizzastate = useSelector((state) => state.addPizzaReducer);
  const { loading, error, success } = addpizzastate;

  function formHandler(e) {
    e.preventDefault();

    const pizza = {
      name,
      image,
      description,
      category,
      prices: {
        small: smallprice,
        medium: mediumprice,
        large: largeprice,
      },
    };

    dispatch(addPizza(pizza));
  }

  return (
    <div>
      <div className="text-start">
        <h1>Add Pizza</h1>

        {loading && <Loading />}
        {error && <Error error={error} />}
        {success && <Success success="New pizza added successfully." />}

        <form onSubmit={formHandler}>
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
          />
          <input
            className="form-control"
            type="number"
            placeholder="Small variant price"
            value={smallprice}
            onChange={(e) => setsmallprice(e.target.value)}
            required
          />
          <input
            className="form-control"
            type="number"
            placeholder="Medium variant price"
            value={mediumprice}
            onChange={(e) => setmediumprice(e.target.value)}
            required
          />
          <input
            className="form-control"
            type="number"
            placeholder="Large variant price"
            value={largeprice}
            onChange={(e) => setlargeprice(e.target.value)}
            required
          />
          <input
            className="form-control"
            type="text"
            placeholder="Category (veg/nonveg)"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            required
          />
          <input
            className="form-control"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            required
          />
          <input
            className="form-control"
            type="url"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setimage(e.target.value)}
            required
          />
          <button className="btn mt-3" type="submit">
            Add Pizza
          </button>
        </form>
      </div>
    </div>
  );
}
