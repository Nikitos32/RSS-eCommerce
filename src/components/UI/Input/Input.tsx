import classNames from 'classnames';
import { InputType } from '../../../constants';
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
  isPasswordVisible?: boolean;
  additionalClass?: string;
}

export const Input = ({
  type,
  value,
  handleInput,
  regex,
  minLength,
  placeholder,
  isPasswordVisible,
  additionalClass,
}: InputProps) => {
  return (
    <input
      required
      placeholder={placeholder}
      minLength={minLength}
      pattern={regex && regex}
      onChange={(event) => {
        handleInput(event);
      }}
      value={value}
      type={
        isPasswordVisible
          ? InputType.TEXT
          : type
      }
      className={classNames(
        classes.colorRed,
        additionalClass &&
          classes[additionalClass]
      )}
    />
  );
};
