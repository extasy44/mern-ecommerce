import React, { useState } from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { userType } from '../../reducers/userType';

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: userType.LOGGED_IN_USER,
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      setLoading(false);
      history.push('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: userType.LOGGED_IN_USER,
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const completeRegisterationForm = () => (
    <form>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="enter your email"
      />
      <br />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="enter your password"
      />
      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-1"
        block
        shape
        size="large"
        disabled={!email || password.length < 6}
        icon={<MailOutlined />}
      >
        Login with Email / Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {!loading ? (
            <h4>Log in</h4>
          ) : (
            <h4 className="text-danger">Loading...</h4>
          )}

          {completeRegisterationForm()}
          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            size="large"
            disabled={!email || password.length < 6}
            icon={<GoogleOutlined />}
          >
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
