import { Input } from '../UI/Input/Input';
import { ShowPasswordRadio } from '../UI/ShowPasswordRadio/ShowPasswordRadio';
import { InputType } from '../../constants';
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
            handleInput={handleInput}
            type={InputType.PASSWORD}
            value={password}
          />
          <ShowPasswordRadio />
        </section>
      </fieldset>
    );
  };
