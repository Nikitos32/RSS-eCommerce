import classes from './HeaderNavbarWithPngPicturesItem.module.css';

interface HeaderNavbarWithPngPicturesItemProps {
  content: string;
}

export const HeaderNavbarWithPngPicturesItem = ({
  content,
}: HeaderNavbarWithPngPicturesItemProps) => {
  return (
    <a href={`/${content.toLowerCase()}`} className={classes.NavbarPngItem}>
      <img
        className={classes.pngLink}
        src={`/public/png/${content}.png`}
        alt={content}
      />
    </a>
  );
};
