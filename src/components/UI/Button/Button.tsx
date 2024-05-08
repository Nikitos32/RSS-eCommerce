import classes from './Button.module.css';

interface ButtonProps {
  content: string;
}

export const Button = ({
  content,
}: ButtonProps) => {
  return (
    <button
      className={classes.LoginBtn}
    >
      {content}
    </button>
  );
};
