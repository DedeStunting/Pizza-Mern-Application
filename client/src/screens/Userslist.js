import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { getAllUsers, deleteUser } from '../actions/userActions';

export default function Userslist() {
  const dispatch = useDispatch();
  const userstate = useSelector((state) => state.getAllUsersReducer);
  const { loading, users, error } = userstate;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = (userId) => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this user? This action cannot be undone.'
    );
    if (confirmation) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <div>
      <h1>Users List</h1>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}

      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <i
                    className="fa fa-trash text-danger"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(user._id)}
                  ></i>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
