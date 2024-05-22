import { Link } from 'react-router-dom';
import { Button } from '../UI/Button/Button';
import classes from './LoginFieldsetEnterSection.module.css';

export const LoginFieldsetEnterSection = () => {
  return (
    <fieldset className={classes.loginFormFieldset}>
      <Button isSubmitBtn={true} content="Enter" />
      <Link to="/RSS-eCommerce/signup">Registration</Link>
    </fieldset>
  );
};
