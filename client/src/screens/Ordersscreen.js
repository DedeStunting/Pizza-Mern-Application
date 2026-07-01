import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../actions/orderActions';
import Error from '../components/Error';
import Loading from '../components/Loading';

export default function Ordersscreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.loginUserReducer);
  const { orders, loading, error } = useSelector((state) => state.getUserOrdersReducer);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    dispatch(getUserOrders());
  }, [currentUser, dispatch, navigate]);

  if (!currentUser) {
    return null;
  }

  return (
    <div>
      <h2 style={{ fontSize: '35px' }}>My Orders</h2>
      <hr />
      <div className="row justify-content-center">
        {loading && <Loading />}
        {error && <Error error={error} />}
        {!loading && !error && orders?.length === 0 && <p>You have no orders yet.</p>}
        {orders?.map((order) => (
          <div
            className="col-md-8 m-2 p-1"
            style={{ backgroundColor: 'rgb(194, 137, 62)', color: 'whitesmoke' }}
            key={order._id}
          >
            <div className="flex-container">
              <div className="text-start w-100 m-1">
                <h2 style={{ fontSize: '25px' }}>Items</h2>
                <hr />
                {order.orderItems.map((item) => (
                  <div key={`${item._id}-${item.varient}`}>
                    <p>
                      {item.name} [{item.varient}] × {item.quantity} = {item.price}₦
                    </p>
                  </div>
                ))}
              </div>
              <div className="text-start w-100 m-1">
                <h2 style={{ fontSize: '25px' }}>Address</h2>
                <hr />
                {order.shippingAddress ? (
                  <>
                    <p>Street: {order.shippingAddress.street}</p>
                    <p>City: {order.shippingAddress.city}</p>
                    <p>Country: {order.shippingAddress.country}</p>
                    <p>Postal Code: {order.shippingAddress.postalCode}</p>
                  </>
                ) : (
                  <p>No shipping address provided.</p>
                )}
              </div>
              <div className="text-start w-100 m-1">
                <h2 style={{ fontSize: '25px' }}>Order Info</h2>
                <hr />
                <p>Amount: {order.orderAmount}₦</p>
                <p>Date: {order.createdAt.substring(0, 10)}</p>
                <p>Transaction ID: {order.transactionId}</p>
                <p>Status: {order.isDelivered ? 'Delivered' : 'Pending'}</p>
                <p>Order ID: {order._id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
