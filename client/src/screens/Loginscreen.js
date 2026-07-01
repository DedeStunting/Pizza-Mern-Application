import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/userActions';
import Error from '../components/Error';
import Loading from '../components/Loading';

export default function Loginscreen() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const loginstate = useSelector((state) => state.loginUserReducer);
  const { loading, error } = loginstate;
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('currentUser')) {
      window.location.href = '/';
    }
  }, []);

  function login() {
    dispatch(loginUser({ email, password }));
  }

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-start shadow-lg p-3 mb-5 bg-white rounded">
          <h2 className="text-center m-2" style={{ fontSize: '35px' }}>
            Login
          </h2>

          {loading && <Loading />}
          {error && <Error error={error} />}

          <div>
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <button onClick={login} className="btn mt-2 mb-3" type="button">
              LOGIN
            </button>
            <br />
            <Link to="/register">Click here to register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
