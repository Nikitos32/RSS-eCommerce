import classes from './InputConatiner.module.css';
import {
  InputSignUp,
  InputType,
} from '../InputSignUp/InputSignUp';

type InputConatinerProps = {
  content: string;
  type: InputType;
  customClass: string;
};

export const InputConatiner = ({
  content,
  type,
  customClass,
}: InputConatinerProps) => {
  return (
    <div
      className={
        classes.signUp__inputContainer
      }
    >
      <label
        className={
          classes.signUp__label
        }
      >
        {content}
      </label>
      <InputSignUp
        type={type}
        customClass={customClass}
        placeholder={`${content}...`}
      />
      <div></div>
    </div>
  );
};
