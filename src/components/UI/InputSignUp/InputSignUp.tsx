import classes from './inputSignUp.module.css';

export enum InputType {
  TEXT = 'text',
  DATA = 'date',
  NUMBER = 'number',
  PASSWORD = 'password',
  EMAIL = 'email',
}

type InputProps = {
  type: InputType;
  customClass: string;
  placeholder?: string;
};

export const InputSignUp = ({
  type,
  customClass,
  placeholder,
}: InputProps) => {
  return (
    <input
      type={type}
      className={`${classes.signUp__input} ${classes[customClass]}`}
      placeholder={placeholder}
    />
  );
};
