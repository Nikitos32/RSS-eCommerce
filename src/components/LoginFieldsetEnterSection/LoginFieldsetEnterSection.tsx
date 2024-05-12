import { Button } from '../UI/Button/Button';
import classes from './LoginFieldsetEnterSection.module.css';

export const LoginFieldsetEnterSection =
  () => {
    return (
      <fieldset
        className={
          classes.loginFormFieldset
        }
      >
        <Button content="Enter" />
        <a href="">Registration</a>
      </fieldset>
    );
  };
