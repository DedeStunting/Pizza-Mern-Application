import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/userActions';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Success from '../components/Success';

export default function Registerscreen() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');
  const registerstate = useSelector((state) => state.registerUserReducer);
  const { error, loading, success } = registerstate;
  const dispatch = useDispatch();

  function register() {
    if (password !== cpassword) {
      alert('Passwords do not match.');
      return;
    }

    dispatch(registerUser({ name, email, password }));
  }

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-start shadow-lg p-3 mb-5 bg-white rounded">
          <h2 className="text-center m-2" style={{ fontSize: '35px' }}>
            Register
          </h2>

          {loading && <Loading />}
          {success && <Success success="Account created successfully. You can log in now." />}
          {error && <Error error={error} />}

          <div>
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
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
            <input
              type="password"
              placeholder="Confirm password"
              className="form-control"
              value={cpassword}
              onChange={(e) => setcpassword(e.target.value)}
            />
            <button onClick={register} className="btn mt-2" type="button">
              REGISTER
            </button>
            <br />
            <Link to="/login">Click here to log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
