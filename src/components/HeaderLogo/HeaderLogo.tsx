import { Links } from '../../constants';
import classes from './headerLogo.module.css';

export const HeaderLogo = () => {
  return (
    <a href={`/${Links.HOME.toLowerCase()}`}>
      <img
        className={classes.logo}
        src="/public/png/Random20Logo.png"
        alt="logo"
      />
    </a>
  );
};
