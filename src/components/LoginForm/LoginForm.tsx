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
    //console.log(
    // new RegExp(
    // REGEX_FOR_EMAIL_INPUT
    // ).test(target.value)
    //);
    switch (target.type) {
      case InputType.EMAIL: {
        setEmailInputValue(
          target.value
        );
        break;
      }

      case InputType.PASSWORD: {
        setPasswordInputValue(
          target.value
        );
        break;
      }

      case InputType.TEXT: {
        setPasswordInputValue(
          target.value
        );
        break;
      }
    }
  };

  return (
    <form className={classes.loginForm}>
      <LoginFieldsetWithInputs
        handleInput={handleValue}
        email={emailInputValue}
        password={passwordInputValue}
      />
      <LoginFieldsetEnterSection />
    </form>
  );
};
