import React, { useState, useEffect, useContext } from 'react';
import './AuthPage.scss';
import useHttp from '../hooks/http.hook';
import useMessage from '../hooks/message.hook';
import AuthContext from '../context/AuthContext';

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event: any) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {
        ...form,
      });
      console.log('DATA', data);
    } catch (error) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {
        ...form,
      });
      auth.login(data.token, data.userId);
    } catch (error) {}
  };

  return (
    <div className="container my-2">
      <div className=" col-sm-6 offset-sm-3">
        <h1 className="text-center">Shorten URL</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Authorization</h5>

            <label htmlFor="email">Email</label>
            <div className="input-group input-area">
              <input
                type="text"
                placeholder="Enter your email"
                id="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={changeHandler}
              />
            </div>
            <label htmlFor="password">Password</label>
            <div className="input-group input-area">
              <input
                type="password"
                placeholder="Enter your password"
                id="password"
                className="form-control"
                name="password"
                value={form.password}
                onChange={changeHandler}
              />
            </div>
            <div className="d-flex">
              <button
                className="btn btn-primary sign-in-btn"
                disabled={loading}
                onClick={loginHandler}
              >
                Sign In
              </button>
              <button
                className="btn btn-secondary sign-up-btn"
                onClick={registerHandler}
                disabled={loading}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
