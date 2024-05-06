import classes from './input.module.css';

interface InputProps {
  type: string;
}

export const Input = ({
  type,
}: InputProps) => {
  return (
    <input
      type={type}
      className={classes.colorRed}
    />
  );
};
