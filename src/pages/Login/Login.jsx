import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoginStyles } from './Login.styles';
import { Button, InputField, PasswordInputField } from '../../components';
import { useAuth } from '../../hooks';

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
        <h1 className={classes.heading}>NAME</h1>
        <div className={classes.loginBox}>
          <p className={classes.subHeading}>Log In to Name</p>
          {error && <p>{error}</p>}
          <form onSubmit={submitHandler}>
            <InputField
              callback={onChangeCallback}
              value={credentials.email}
              name='email'
              placeholder='Enter your email'
              type='email'
              width='19rem'
              hasLabel
            />
            <PasswordInputField
              callback={onChangeCallback}
              value={credentials.password}
              name='password'
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
