import React, { useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const Register = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email has been sent to ${email}, Click the link to complete your registration`
    );

    // save use email in local storage
    window.localStorage.setItem('emailForRegistration', email);

    // clear state
    setEmail('');
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="enter your email address"
      />
      <br />
      <button type="submit" className="btn btn-raised mt-4">
        Verify
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>

          <div className="mb-2">
            Type your email to register, we will send you an email to verify
            your emaill address{' '}
          </div>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
