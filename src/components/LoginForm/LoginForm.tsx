import { FormEvent, useState } from 'react';
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

import { useApiSignIn } from '../../hooks/useApiSignIn';
import { useAuth } from '../../hooks';
import Spinner from '../Spinner';
import { toast } from 'react-toastify';

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { authenticated: isLoggedIn } = useAuth();

  const [emailInputValue, setEmailInputValue] = useState<string>('');

  const [passwordInputValue, setPasswordInputValue] = useState<string>('');

  const { signIn } = useApiSignIn();

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
    setIsLoading(true);

    const response: CTResponse = await signIn(
      emailInputValue,
      passwordInputValue
    );
    if (response.ok) {
      setIsLoading(false);
      toast.success('Success Authorization!');

      setPasswordInputValue('');
      setEmailInputValue('');
    } else {
      setIsLoading(false);
      if (response.message) {
        toast.error(response.message);
      }
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    LogIn();
  };

  return isLoggedIn ? (
    <Navigate to="/" />
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
        <Spinner isLoading={isLoading} />
      </form>
    </>
  );
};
