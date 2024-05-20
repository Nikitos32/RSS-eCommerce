import { HeaderLogo } from '../HeaderLogo/HeaderLogo';
import { HeaderNavbar } from '../HeaderNavbar/HeaderNavbar';
import { HeaderNavbarWithPngPictures } from '../HeaderNavbarWithPngPictures/HeaderNavbarWithPngPictures';
import classes from './header.module.css';

export const Header = () => {
  return (
    <div
      className={classes.headerWrapper}
    >
      <HeaderLogo />
      <HeaderNavbar />
      <HeaderNavbarWithPngPictures />
    </div>
  );
};
