import {
  FormEvent,
  useContext,
  useState,
} from 'react';
import { LoginFieldsetEnterSection } from '../LoginFieldsetEnterSection/LoginFieldsetEnterSection';
import { LoginFieldsetWithInputs } from '../LoginFieldsetWithInputs/LoginFieldsetWithInputs';
import classes from './loginForm.module.css';
import {
  EMAIL_INVALID_INPUT_MESSAGE,
  PASSWORD_INVALID_INPUT_MESSAGE,
  InputType,
} from '../../constants';
import { LoginFormTitle } from '../LoginFormTitle/LoginFormTitle';
import { CustomerService } from '../../services/customer.service';
import { CTResponse } from '../../ct-client';
import { Navigate } from 'react-router-dom';
import { IsLoginedContext } from '../../App';

export const LoginForm = () => {
  const [isLogined, setIsLogined] =
    useContext(IsLoginedContext);

  const [
    emailInputValue,
    setEmailInputValue,
  ] = useState<string>('');

  const [
    passwordInputValue,
    setPasswordInputValue,
  ] = useState<string>('');

  const handleValue = (
    event: React.ChangeEvent
  ) => {
    const target =
      event.target as HTMLInputElement;
    switch (target.type) {
      case InputType.EMAIL: {
        setEmailInputValue(
          target.value
        );
        target.validity.patternMismatch
          ? target.setCustomValidity(
              EMAIL_INVALID_INPUT_MESSAGE
            )
          : target.setCustomValidity(
              ''
            );
        break;
      }

      case InputType.PASSWORD:
      case InputType.TEXT: {
        setPasswordInputValue(
          target.value.trim()
        );
        target.validity.patternMismatch
          ? target.setCustomValidity(
              PASSWORD_INVALID_INPUT_MESSAGE
            )
          : target.setCustomValidity(
              ''
            );
        break;
      }
    }
  };

  async function LogIn() {
    const customerService =
      new CustomerService();
    const response: CTResponse =
      await customerService.signIn(
        emailInputValue,
        passwordInputValue
      );
    //'test2@example.com', 'test2'
    if (response.ok) {
      if (
        typeof setIsLogined !==
        'boolean'
      ) {
        setIsLogined();
      }
    }
  }

  const handleSubmit = (
    event: FormEvent
  ) => {
    event.preventDefault();
    LogIn().then(() => {
      setPasswordInputValue('');
      setEmailInputValue('');
    });
  };

  return isLogined ? (
    <Navigate to="/" />
  ) : (
    <form
      onSubmit={handleSubmit}
      className={classes.loginForm}
    >
      <LoginFormTitle />
      <LoginFieldsetWithInputs
        handleInput={handleValue}
        email={emailInputValue}
        password={passwordInputValue}
      />
      <LoginFieldsetEnterSection />
    </form>
  );
};
