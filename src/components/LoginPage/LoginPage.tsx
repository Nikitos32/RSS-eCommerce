import { LoginForm } from '../LoginForm/LoginForm';
import classes from './loginPage.module.css';

export const LoginPage = () => {
  return (
    <section className={classes.centeredSection}>
      <LoginForm />
    </section>
  );
};
