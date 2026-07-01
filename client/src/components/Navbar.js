import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export default function Navbar() {
  const cartstate = useSelector((state) => state.cartReducer);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    dispatch({ type: 'USER_LOGOUT' });
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded">
      <Link className="navbar-brand" to="/">
        BUNDO PIZZA
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-center">
          {currentUser ? (
            <li className="nav-item dropdown">
              <button
                className="btn btn-link nav-link dropdown-toggle text-decoration-none"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {currentUser.name}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/orders">
                    Orders
                  </Link>
                </li>
                {currentUser.isAdmin && (
                  <li>
                    <Link className="dropdown-item" to="/admin">
                      Admin Panel
                    </Link>
                  </li>
                )}
                <li>
                  <button className="dropdown-item" type="button" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          )}
          <li className="nav-item">
            <Link className="nav-link" to="/cart">
              Cart ({cartstate.cartItems.length})
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
