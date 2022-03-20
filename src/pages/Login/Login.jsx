import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, InputField, PasswordInputField } from '../../components';
import { useAuth } from '../../hooks';
import { literals } from '../../utils/constants';
import { useLoginStyles } from './Login.styles';

export const Login = () => {
  const classes = useLoginStyles();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { loading, loginWithUserCredentials } = useAuth();
  const [error, setError] = useState(null);

  const onChangeCallback = ({ target }) =>
    setCredentials({ ...credentials, [target.id]: target.value });

  const isFieldsEmpty = !credentials.email.trim().length || !credentials.password.trim().length;

  const submitHandler = async () => {
    const { success, err } = await loginWithUserCredentials(credentials);
    if (!success) {
      setError(err);
    }
  };

  return (
    <div className={classes.background}>
      <div>
        <h1 className={classes.heading}>{literals.NAME}</h1>
        <div className={classes.loginBox}>
          <p className={classes.subHeading}>Log In to {literals.NAME}</p>
          {error && <p>{error}</p>}
          <form onSubmit={submitHandler}>
            <InputField
              changeCallback={onChangeCallback}
              value={credentials.email}
              id='email'
              placeholder='Enter your email'
              type='email'
              width='19rem'
              hasLabel
            />
            <PasswordInputField
              changeCallback={onChangeCallback}
              value={credentials.password}
              id='password'
              placeholder='Enter your password'
              width='19rem'
            />
            <Button width='20rem' margin='1.5rem 0 0 0' disabled={isFieldsEmpty || loading}>
              Log In
            </Button>
          </form>
          <p className={classes.orSeparator}>Or</p>
          <Button
            width='20rem'
            bgColor='white'
            border='2px solid black'
            textColor='black'
            type='submit'
          >
            Continue with Google
          </Button>
          <div className={classes.line} />
          <Link to='/signup'>Don’t have an account? Sign up</Link>
        </div>
      </div>
    </div>
  );
};
