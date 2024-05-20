import classes from './HeaderNavbarItem.module.css';

interface HeaderNavbarItemProps {
  content: string;
}

export const HeaderNavbarItem = ({
  content,
}: HeaderNavbarItemProps) => {
  return (
    <a
      href={`/${content.toLowerCase()}`}
      className={classes.navbarLink}
    >
      {content}
    </a>
  );
};
