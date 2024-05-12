import { Input } from '../UI/Input/Input';
import { ShowPasswordRadio } from '../UI/ShowPasswordRadio/ShowPasswordRadio';
import {
  InputType,
  MIN_PASSWORD_LENGTH,
  REGEX_FOR_EMAIL_INPUT,
  REGEX_FOR_PASSWORD_INPUT,
  STYLE_FOR_PASSWORD_INPUT,
} from '../../constants';
import classes from './LoginFieldsetWithInputs.module.css';
import { useState } from 'react';

interface LoginFieldsetWithInputsProps {
  email: string;
  password: string;
  handleInput: (
    event: React.ChangeEvent
  ) => void;
}

export const LoginFieldsetWithInputs =
  ({
    email,
    password,
    handleInput,
  }: LoginFieldsetWithInputsProps) => {
    const [
      isPasswordVisible,
      setPasswordVisible,
    ] = useState<boolean>(false);

    const handleVisibility = () => {
      setPasswordVisible(
        !isPasswordVisible
      );
    };

    return (
      <fieldset
        className={
          classes.loginFormFieldset
        }
      >
        <Input
          regex={REGEX_FOR_EMAIL_INPUT}
          handleInput={handleInput}
          type={InputType.EMAIL}
          value={email}
        />
        <section
          className={
            classes.passwordSection
          }
        >
          <div
            className={
              classes.wrapperPasswordInput
            }
          >
            <Input
              additionalClass={
                STYLE_FOR_PASSWORD_INPUT
              }
              isPasswordVisible={
                isPasswordVisible
              }
              regex={
                REGEX_FOR_PASSWORD_INPUT
              }
              minLength={
                MIN_PASSWORD_LENGTH
              }
              handleInput={handleInput}
              type={InputType.PASSWORD}
              value={password}
            />
            <ShowPasswordRadio
              visible={
                isPasswordVisible
              }
              handleVisibility={
                handleVisibility
              }
            />
          </div>
        </section>
      </fieldset>
    );
  };
