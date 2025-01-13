import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../actions/userActions'

export default function Navbar() {

    const cartstate = useSelector(state => state.cartReducer)
    const userstate = useSelector(state => state.loginUserReducer)
    const { currentUser } = userstate
    const dispatch = useDispatch()

    return (
        <div>
            <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded">
                <a className="navbar-brand" href="/">BUNDO PIZZA</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">

                        {currentUser ? (
                            <div className="dropdown mt-2">
                                <a className="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {currentUser.name}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                                    <a className="dropdown-item" href="/orders">Orders</a>
                                    <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={() => {
                                            dispatch(logoutUser()); // Properly invoke the logoutUser action
                                        }}
                                    >
                                        <li>Logout</li>
                                    </a> </ul>
                            </div>
                        ) : (
                            <li className="nav-item">
                                <a className="nav-link" href="/login">
                                    Login</a>
                            </li>)}
                        <li className="nav-item">
                            <a className="nav-link" href="/cart">Cart {cartstate.cartItems.length}</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
