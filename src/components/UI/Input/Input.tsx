import classes from './input.module.css';

interface InputProps {
  type: string;
  value?: string;
  handleInput: (
    event: React.ChangeEvent
  ) => void;
}

export const Input = ({
  type,
  value,
  handleInput,
}: InputProps) => {
  return (
    <input
      onChange={(event) =>
        handleInput(event)
      }
      value={value}
      type={type}
      className={classes.colorRed}
    />
  );
};
