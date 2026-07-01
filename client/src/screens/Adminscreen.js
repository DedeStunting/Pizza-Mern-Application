import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import Addpizza from './Addpizza';
import Orderslist from './Orderslist';
import Pizzaslist from './Pizzaslist';
import Userslist from './Userslist';
import Editpizza from './Editpizza';

export default function Adminscreen() {
  const navigate = useNavigate();
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;

  useEffect(() => {
    if (!currentUser?.isAdmin) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  if (!currentUser?.isAdmin) {
    return null;
  }

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2 style={{ fontSize: '35px' }}>Admin Panel</h2>

          <ul className="adminfunctions">
            <li>
              <Link to="/admin/userlist">Users List</Link>
            </li>
            <li>
              <Link to="/admin/pizzaslist">Pizzas List</Link>
            </li>
            <li>
              <Link to="/admin/addpizza">Add New Pizza</Link>
            </li>
            <li>
              <Link to="/admin/orderlist">Orders List</Link>
            </li>
          </ul>

          <Routes>
            <Route path="/" element={<Userslist />} />
            <Route path="userlist" element={<Userslist />} />
            <Route path="pizzaslist" element={<Pizzaslist />} />
            <Route path="addpizza" element={<Addpizza />} />
            <Route path="orderlist" element={<Orderslist />} />
            <Route path="editpizza/:pizzaid" element={<Editpizza />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
