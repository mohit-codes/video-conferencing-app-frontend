import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { Button, Card, Container, InputField, PasswordInputField, Row } from '../../components';
import { useAuth } from '../../hooks';
import { literals } from '../../utils/constants';
import { useLoginStyles } from './login.styles';
import { useSignupStyles } from '../Signup/signup.styles';
import { globalTheme } from '../../theme';

export const Login = () => {
  const classes = useLoginStyles();
  const signupClasses = useSignupStyles();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { loading, loginWithUserCredentials } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onChangeCallback = ({ target }) =>
    setCredentials({ ...credentials, [target.name]: target.value });

  const isFieldsEmpty = !credentials.email.trim().length || !credentials.password.trim().length;

  const submitHandler = async (e) => {
    e.preventDefault();
    const { success, error: err } = await loginWithUserCredentials(credentials);
    if (err) {
      setError(err);
    } else {
      navigate('home');
    }
  };

  return (
    <div className={clsx(signupClasses.centerDiv, classes.background)}>
      <Container>
        <Row center className={signupClasses.headRow}>
          <h1 className={classes.heading}> {literals.NAME}</h1>
        </Row>
        <Row center>
          <Card>
            <Row center className={classes.subHeading}>
              Log In to {literals.NAME}
            </Row>
            <Row className={classes.error}>{error}</Row>
            <form className={signupClasses.form} onSubmit={submitHandler}>
              <InputField
                changeCallback={onChangeCallback}
                value={credentials.email}
                name='email'
                placeholder='Enter your email'
                type='email'
                width='20rem'
                label='Email'
              />
              <PasswordInputField
                changeCallback={onChangeCallback}
                value={credentials.password}
                name='password'
                placeholder='Enter your password'
                width='20rem'
                label='Password'
              />
              <Button width='20rem' margin='1rem 0 0' disabled={isFieldsEmpty || loading}>
                Log In
              </Button>
            </form>
            <Row center>Or</Row>
            <Row center>
              <Button
                width='20rem'
                bgColor='white'
                border='2px solid'
                textColor={globalTheme.greyColor}
                margin='0.5rem'
              >
                Continue with Google
              </Button>
            </Row>
            <Row center>
              <div className={classes.line} />
            </Row>
            <Row center className={classes.mb1}>
              <Link to='/signup'>Don&apos;t have an account? Sign up</Link>
            </Row>
          </Card>
        </Row>
      </Container>
    </div>
  );
};
