import classes from './input.module.css';

interface InputProps {
  type: string;
  value?: string;
  handleInput: (
    event: React.ChangeEvent
  ) => void;
  regex?: string;
  minLength?: number;
  placeholder?: string;
}

export const Input = ({
  type,
  value,
  handleInput,
  regex,
  minLength,
  placeholder,
}: InputProps) => {
  return (
    <input
      placeholder={placeholder}
      minLength={minLength}
      pattern={regex && regex}
      onChange={(event) =>
        handleInput(event)
      }
      value={value}
      type={type}
      className={classes.colorRed}
    />
  );
};
