import { Input } from '../UI/Input/Input';
import { ShowPasswordRadio } from '../UI/ShowPasswordRadio/ShowPasswordRadio';
import {
  InputType,
  MIN_PASSWORD_LENGTH,
  REGEX_FOR_EMAIL_INPUT,
  REGEX_FOR_PASSWORD_INPUT,
} from '../../constants';
import classes from './LoginFieldsetWithInputs.module.css';

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
          <Input
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
          <ShowPasswordRadio />
        </section>
      </fieldset>
    );
  };
