import { Links } from '../../constants';
import { HeaderNavbarItem } from '../UI/HeaderNavbarItem/HeaderNavbarItem';
import classes from './headerNavbar.module.css';

export const HeaderNavbar = () => {
  return (
    <section
      className={classes.navbarWrapper}
    >
      <HeaderNavbarItem
        content={Links.HOME}
      />
      <HeaderNavbarItem
        content={Links.SHOP}
      />
      <HeaderNavbarItem
        content={Links.ABOUT}
      />
    </section>
  );
};
