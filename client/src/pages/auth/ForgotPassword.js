import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      setTimeout(() => {
        history.push('/');
      }, 500);
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    setLoading(true);
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('');
        setLoading(false);
        toast.success('We have sent you an email for password reset link');
      })
      .catch((error) => {
        setLoading(false);
        console.log('Error message in Forgot Password ', error.message);
        toast.error(error.message);
      });
    setLoading(false);
  };

  return (
    <div className="container col-md-6 offset-md-3 p-5">
      <h4>Forgot Password</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type your email"
          autoFocus
        />
        <br />
        {loading ? (
          <Spin />
        ) : (
          <button className="btn btn-raised" disabled={!email}>
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
