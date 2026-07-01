import React, { useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
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
    if (window.confirm('Delete this user? This cannot be undone.')) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <div>
      <h1>Users List</h1>
      {loading && <Loading />}
      {error && <Error error={error} />}

      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? 'Admin' : 'Customer'}</td>
              <td>
                <FaTrash
                  className="text-danger"
                  role="button"
                  aria-label="Delete user"
                  onClick={() => handleDelete(user._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
