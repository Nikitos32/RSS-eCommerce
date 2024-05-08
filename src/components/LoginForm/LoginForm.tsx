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
    target.type === InputType.EMAIL
      ? setEmailInputValue(target.value)
      : setPasswordInputValue(
          target.value
        );
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
