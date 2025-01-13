import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPizzas, deletePizza } from '../actions/pizzaActions'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { Link } from 'react-router-dom'  // Ensure you're importing Link from 'react-router-dom'


export default function Pizzaslist() {
  const dispatch = useDispatch()
  const pizzasstate = useSelector(state => state.getAllPizzasReducer)
  const { pizzas, error, loading } = pizzasstate

  useEffect(() => {
    dispatch(getAllPizzas())
  }, [dispatch])

  return (
    <div>
      <h2>Pizzas List</h2>
      {loading && (<Loading />)}
      {error && (<Error error="Something went wrong" />)}

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
          {pizzas && pizzas.map(pizza => (
            <tr key={pizza._id}>
              <td>{pizza.name}</td>
              <td>
                Small :  {pizza.prices[0]['small']} <br />
                Medium :  {pizza.prices[0]['medium']} <br />
                Large :  {pizza.prices[0]['large']}
              </td>
              <td>{pizza.category}</td> 
              <td>
                <i className='fa fa-trash m-1' onClick={()=>{dispatch(deletePizza(pizza._id))}}></i>
                {/* Corrected Link using backticks for string interpolation */}
                <Link to={`/admin/editpizza/${pizza._id}`}><i className='fa fa-edit'></i></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
