import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, updateOrderDeliveryStatus } from '../actions/orderActions'; // Use appropriate action
import Loading from '../components/Loading';
import Error from '../components/Error';

export default function Orderslist() {
  const dispatch = useDispatch();
  const ordersState = useSelector(state => state.getAllOrdersReducer);
  const { orders, error, loading } = ordersState;

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleDeliveryToggle = (orderId, isDelivered) => {
    const newStatus = !isDelivered; // Toggle between true and false
    dispatch(updateOrderDeliveryStatus(orderId, newStatus));
  };

  return (
    <div>
      <h2>Orders List</h2>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}

      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Order ID</th>
            <th>Email</th>
            <th>User ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.email}</td>
                <td>{order.userId}</td>
                <td>{order.orderAmount}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>{order.isDelivered ? 'Delivered' : 'Pending'}</td>
                <td>
                  <button
                    className={`btn ${
                      order.isDelivered ? 'btn-danger' : 'btn-success'
                    }`}
                    onClick={() =>
                      handleDeliveryToggle(order._id, order.isDelivered)
                    }
                  >
                    {order.isDelivered ? 'Mark Pending' : 'Mark Delivered'}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
