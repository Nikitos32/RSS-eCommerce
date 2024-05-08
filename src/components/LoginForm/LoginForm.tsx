import { InputType } from '../../constants';
import { Button } from '../UI/Button/Button';
import { Input } from '../UI/Input/Input';
import { ShowPasswordRadio } from '../UI/ShowPasswordRadio/ShowPasswordRadio';
import classes from './loginForm.module.css';

export const LoginForm = () => {
  return (
    <form className={classes.loginForm}>
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
      <fieldset
        className={
          classes.loginFormFieldset
        }
      >
        <Button content="Enter" />
      </fieldset>
    </form>
  );
};
