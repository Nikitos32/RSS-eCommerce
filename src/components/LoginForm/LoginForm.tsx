import { LoginFieldsetEnterSection } from '../LoginFieldsetEnterSection/LoginFieldsetEnterSection';
import { LoginFieldsetWithInputs } from '../LoginFieldsetWithInputs/LoginFieldsetWithInputs';

import classes from './loginForm.module.css';

export const LoginForm = () => {
  return (
    <form className={classes.loginForm}>
      <LoginFieldsetWithInputs />
      <LoginFieldsetEnterSection />
    </form>
  );
};
