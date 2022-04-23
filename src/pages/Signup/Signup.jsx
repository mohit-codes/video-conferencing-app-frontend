import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useGoogleLogin } from 'react-google-login';
import {
  Button,
  Card,
  Col,
  Container,
  InputField,
  PasswordInputField,
  Row
} from '../../components';
import { useAuth } from '../../contexts/authContext';
import { globalTheme } from '../../theme';
import { notifyGoogleLogin, signupUser } from '../../utils/actionHelpers';
import { loginSuccess, setIsAuthLoading } from '../../utils/actions';
import { literals } from '../../utils/constants';
import { useLoginStyles } from '../Login/login.styles';
import { useSignupStyles } from './signup.styles';

export const Signup = () => {
  const loginClasses = useLoginStyles();
  const classes = useSignupStyles();
  const [errMsg, setErrMsg] = useState('');
  const {
    state: { isAuthLoading },
    dispatch
  } = useAuth();

  const { loaded, signIn } = useGoogleLogin({
    clientId: '234832827395-hu97uqhpetag61et1nup430v2seo8o1d.apps.googleusercontent.com',
    fetchBasicProfile: true,
    onFailure: (res) => {
      console.error('fail res', res);
    },
    onSuccess: ({ profileObj: { email, name, imageUrl }, accessToken: token }) => {
      const data = { email, imageUrl, name, token };
      notifyGoogleLogin(data);
      dispatch(loginSuccess(data));
      window.location.reload();
    },
    prompt: 'select_account'
  });

  const [formValues, setFormValues] = useState({
    confirmPass: '',
    email: '',
    name: '',
    password: ''
  });

  const areFieldsEmpty = () => {
    for (const value of Object.values(formValues)) {
      if (!value.trim().length) return true;
    }
    return false;
  };

  const onChangeCB = ({ target: { name, value } }) => {
    setFormValues((values) => ({
      ...values,
      [name]: value
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setIsAuthLoading(true));
    const { error, payload } = await signupUser(formValues);
    if (error) {
      setErrMsg(error.response?.data?.error || error.response?.data?.message || error.message);
    } else {
      dispatch(loginSuccess(payload));
    }

    dispatch(setIsAuthLoading(false));
  };

  const isDisabled = areFieldsEmpty() || isAuthLoading;

  return (
    <div className={clsx(classes.centerDiv, loginClasses.background)}>
      <Container>
        <Row center className={classes.headRow}>
          <h1 className={loginClasses.heading}> {literals.NAME}</h1>
        </Row>
        <Row center>
          <Card>
            <Row center className={loginClasses.subHeading}>
              Sign up for your account
            </Row>
            <Row className={loginClasses.error} center>
              <p className={loginClasses.errorPara}>{errMsg}</p>
            </Row>
            <form onSubmit={submitHandler} className={classes.form}>
              <Row center>
                <Col>
                  <InputField
                    changeCallback={onChangeCB}
                    value={formValues.name}
                    name='name'
                    placeholder='Enter your name'
                    width='20rem'
                    label='Name'
                  />
                  <InputField
                    changeCallback={onChangeCB}
                    value={formValues.email}
                    name='email'
                    placeholder='Enter your email'
                    type='email'
                    width='20rem'
                    label='Email'
                  />
                  <PasswordInputField
                    changeCallback={onChangeCB}
                    value={formValues.password}
                    name='password'
                    placeholder='Enter your password'
                    width='20rem'
                    label='Password'
                  />
                  <PasswordInputField
                    changeCallback={onChangeCB}
                    value={formValues.confirmPass}
                    name='confirmPass'
                    placeholder='Enter same password again'
                    width='20rem'
                    label='Confirm Password'
                  />
                  <Row center>
                    <Button width='20rem' margin='0.5rem 0 0 0' disabled={isDisabled} type='submit'>
                      {isAuthLoading ? 'Signing Up...' : 'Sign up'}
                    </Button>
                  </Row>
                </Col>
              </Row>
            </form>
            <Row center>Or</Row>
            <Row center>
              <Button
                width='20rem'
                bgColor='white'
                textColor={globalTheme.greyColor}
                border='2px solid'
                margin='0.5rem 0 1rem'
                onClick={signIn}
              >
                Continue with Google
              </Button>
            </Row>
          </Card>
        </Row>
      </Container>
    </div>
  );
};
