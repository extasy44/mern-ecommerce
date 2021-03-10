import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { userType } from '../../reducers/userType';

const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/update/user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
    console.log(email);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Email and Password is required');
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      //console.log(result);
      if (result.user.emailVerified) {
        window.localStorage.removeItem('emailForRegistration');

        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        console.log('user', user, 'Token : ', idTokenResult);

        createOrUpdateUser(idTokenResult.token)
          .then((res) =>
            dispatch({
              type: userType.LOGGED_IN_USER,
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            })
          )
          .catch((err) => console.log(err.message));

        history.push('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeRegisterationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />
      <br />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="enter a password"
      />
      <br />
      <button type="submit" className="btn btn-raised mt-4">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {completeRegisterationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
