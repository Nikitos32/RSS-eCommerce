import { FormEvent, useContext, useState } from 'react';
import { LoginFieldsetEnterSection } from '../LoginFieldsetEnterSection/LoginFieldsetEnterSection';
import { LoginFieldsetWithInputs } from '../LoginFieldsetWithInputs/LoginFieldsetWithInputs';
import classes from './loginForm.module.css';
import {
  EMAIL_INVALID_INPUT_MESSAGE,
  PASSWORD_INVALID_INPUT_MESSAGE,
  InputType,
} from '../../constants';
import { LoginFormTitle } from '../LoginFormTitle/LoginFormTitle';
import { CTResponse } from '../../ct-client';
import { Navigate } from 'react-router-dom';
import {
  IsLoadindContext,
  IsLoginedContext,
  notifyError,
  notifySuccess,
} from '../../App';
import { useApiSignIn } from '../../hooks/useApiSignIn';

export const LoginForm = () => {
  const [handleLoading] = useContext(IsLoadindContext);

  const [isLogined, setIsLogined] = useContext(IsLoginedContext);

  const [emailInputValue, setEmailInputValue] = useState<string>('');

  const [passwordInputValue, setPasswordInputValue] = useState<string>('');

  const { signIn } = useApiSignIn(emailInputValue, passwordInputValue);

  const handleValue = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    switch (target.type) {
      case InputType.EMAIL: {
        setEmailInputValue(target.value);
        target.validity.patternMismatch
          ? target.setCustomValidity(EMAIL_INVALID_INPUT_MESSAGE)
          : target.setCustomValidity('');
        break;
      }

      case InputType.PASSWORD:
      case InputType.TEXT: {
        setPasswordInputValue(target.value.trim());
        target.validity.patternMismatch
          ? target.setCustomValidity(PASSWORD_INVALID_INPUT_MESSAGE)
          : target.setCustomValidity('');
        break;
      }
    }
  };

  async function LogIn() {
    //const customerService = new CustomerService();

    handleLoading(true);

    // const response: CTResponse = await customerService.signIn(
    //   emailInputValue,
    //   passwordInputValue
    // );
    //'nikita2024@tut.by', 'Nikita2024@'
    const response: CTResponse = await signIn();
    if (response.ok) {
      handleLoading(false);
      notifySuccess('Success Authorization!');

      setPasswordInputValue('');
      setEmailInputValue('');
      if (typeof setIsLogined !== 'boolean') {
        setIsLogined(true);
      }
    } else {
      handleLoading(false);
      if (response.message) {
        notifyError(response.message);
      }
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    LogIn();
  };

  return isLogined ? (
    <Navigate to="/RSS-eCommerce" />
  ) : (
    <>
      <form onSubmit={handleSubmit} className={classes.loginForm}>
        <LoginFormTitle />
        <LoginFieldsetWithInputs
          handleInput={handleValue}
          email={emailInputValue}
          password={passwordInputValue}
        />
        <LoginFieldsetEnterSection />
      </form>
    </>
  );
};
