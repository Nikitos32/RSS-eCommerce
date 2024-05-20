import { Links } from '../../constants';
import { HeaderNavbarWithPngPicturesItem } from '../UI/HeaderNavbarWithPngPicturesItem/HeaderNavbarWithPngPicturesItem';
import classes from './headerNavbarWithPngPictures.module.css';

export const HeaderNavbarWithPngPictures =
  () => {
    return (
      <section
        className={
          classes.navBarWithPngPicturesWrapper
        }
      >
        <HeaderNavbarWithPngPicturesItem
          content={Links.ACCOUNT}
        />
        <HeaderNavbarWithPngPicturesItem
          content={Links.CART}
        />
      </section>
    );
  };
