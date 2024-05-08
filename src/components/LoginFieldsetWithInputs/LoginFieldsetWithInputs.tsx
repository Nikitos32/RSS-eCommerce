import { Input } from '../UI/Input/Input';
import { ShowPasswordRadio } from '../UI/ShowPasswordRadio/ShowPasswordRadio';
import { InputType } from '../../constants';
import classes from './LoginFieldsetWithInputs.module.css';

export const LoginFieldsetWithInputs =
  () => {
    return (
      <fieldset
        className={
          classes.loginFormFieldset
        }
      >
        <Input type={InputType.EMAIL} />
        <section
          className={
            classes.passwordSection
          }
        >
          <Input
            type={InputType.PASSWORD}
          />
          <ShowPasswordRadio />
        </section>
      </fieldset>
    );
  };
