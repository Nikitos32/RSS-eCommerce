import {
  FormEvent,
  useState,
} from 'react';
import { LoginFieldsetEnterSection } from '../LoginFieldsetEnterSection/LoginFieldsetEnterSection';
import { LoginFieldsetWithInputs } from '../LoginFieldsetWithInputs/LoginFieldsetWithInputs';
import classes from './loginForm.module.css';
import { InputType } from '../../constants';
import { LoginFormTitle } from '../LoginFormTitle/LoginFormTitle';

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
        target.validity.patternMismatch
          ? target.setCustomValidity(
              'Email должен быть в данном формате example@example.com'
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
              'Пароль должен содержать хотя бы одну заглавную букву, одну цифру и один специальный символ !@#$%^&*'
            )
          : target.setCustomValidity(
              ''
            );
        break;
      }
    }
  };

  const handleSubmit = (
    event: FormEvent
  ) => {
    event.preventDefault();
    setPasswordInputValue('');
    setEmailInputValue('');
  };

  return (
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
