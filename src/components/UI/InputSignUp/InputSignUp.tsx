import { ChangeEvent } from 'react';
import classes from './inputSignUp.module.css';
import { InputType } from '../../../type/enums/SignUpEnums';

type InputProps = {
  type: InputType;
  customClass: string;
  placeholder: string;
  value: string;
  valueChange: (
    newValue: string
  ) => void;
};

export const InputSignUp = ({
  type,
  customClass,
  placeholder = '',
  value,
  valueChange,
}: InputProps) => {
  return (
    <input
      type={type}
      className={`${classes.signUp__input} ${classes[customClass]}`}
      placeholder={placeholder}
      value={value}
      onChange={(
        event: ChangeEvent<HTMLInputElement>
      ) =>
        valueChange(event.target.value)
      }
    />
  );
};
