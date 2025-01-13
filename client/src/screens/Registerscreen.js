import React, { useState } from 'react';
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
    const registerstate = useSelector(state =>state.registerUserReducer);
    const { error, loading, success } = registerstate;

    // Properly invoke the useDispatch hook
    const dispatch = useDispatch();

    function register() {
        if (password !== cpassword) {
            alert('Passwords do not match!');
        } else {
            const user = {
                name,
                email,
                password,
            };
            console.log(user);
            dispatch(registerUser(user));
        }
    }

    return (
        <div>
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5 text-start shadow-lg p-3 mb-5 bg-white rounded">

                    {loading && (<Loading />)}
                    {success && (<Success success='User Registered  Successfully'/>)}
                    {error && (<Error error='Email already registered'/>)}

                    <h2 className="text-center m-2" style={{ fontSize: '35px' }}>
                        Register
                    </h2>
                    <div>
                        <input
                            type="text"
                            placeholder="name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="confirm password"
                            className="form-control"
                            value={cpassword}
                            onChange={(e) => setcpassword(e.target.value)}
                        />
                        <button onClick={register} className="btn mt-2">
                            REGISTER
                        </button>
                        <br/>
                        <a href="/login">Click Here To Login</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
