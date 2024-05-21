import { BtnType } from '../../../constants';
import classes from './Button.module.css';

interface ButtonProps {
  content: string;
  isSubmitBtn: boolean;
}

export const Button = ({ content, isSubmitBtn }: ButtonProps) => {
  return (
    <button
      type={isSubmitBtn ? BtnType.SUBMIT : BtnType.BUTTON}
      className={classes.LoginBtn}
    >
      {content}
    </button>
  );
};
