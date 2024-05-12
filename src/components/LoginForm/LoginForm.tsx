import { useState } from 'react';
import { LoginFieldsetEnterSection } from '../LoginFieldsetEnterSection/LoginFieldsetEnterSection';
import { LoginFieldsetWithInputs } from '../LoginFieldsetWithInputs/LoginFieldsetWithInputs';
import classes from './loginForm.module.css';
import { InputType } from '../../constants';

export const LoginForm = () => {
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
        break;
      }

      case InputType.PASSWORD:
      case InputType.TEXT: {
        setPasswordInputValue(
          target.value.trim()
        );
        break;
      }
    }
  };

  return (
    <form className={classes.loginForm}>
      <h1
        className={
          classes.titleOfLoginPage
        }
      >
        Log IN
      </h1>
      <LoginFieldsetWithInputs
        handleInput={handleValue}
        email={emailInputValue}
        password={passwordInputValue}
      />
      <LoginFieldsetEnterSection />
    </form>
  );
};
