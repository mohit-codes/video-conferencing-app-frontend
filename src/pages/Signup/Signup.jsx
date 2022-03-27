import { useState } from 'react';
import clsx from 'clsx';
import {
  Button,
  Card,
  Col,
  Container,
  InputField,
  PasswordInputField,
  Row
} from '../../components';
import { useLoginStyles } from '../Login/login.styles';
import { literals } from '../../utils/constants';
import { useSignupStyles } from './signup.styles';
import { globalTheme } from '../../theme';

export const Signup = () => {
  const loginClasses = useLoginStyles();
  const classes = useSignupStyles();
  const [isLoading, setIsLoading] = useState(false);
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
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const isDisabled = areFieldsEmpty() || isLoading;
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
                      Sign up
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
