import classes from './Button.module.css';

interface ButtonProps {
  btnContent: string;
  isHovered: boolean;
  handleHover: () => void;
}

export const Button = ({
  btnContent,
  isHovered,
  handleHover,
}: ButtonProps) => {
  return (
    <button
      className={
        isHovered
          ? classes.boxShadow
          : classes.redBackground
      }
      onClick={() => handleHover()}
    >
      {btnContent}
    </button>
  );
};
