import classes from './inputSignUp.module.css';

export enum InputType {
  TEXT = 'text',
  DATA = 'data',
  NUMBER = 'number',
  PASSWORD = 'password',
}

type InputProps = {
  type: InputType;
  className: string;
  placeholder?: string;
};

export const Input = ({
  type,
  className,
  placeholder,
}: InputProps) => {
  return (
    <input
      type={type}
      className={`${classes.signUp__input} ${className}`}
      placeholder={placeholder}
    />
  );
};
