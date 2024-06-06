import classes from './buttonSignUp.module.css';

type ButtonProps = {
  btnContent: string;
  customClass: string;
  disabled?: boolean;
  customFunction?: () => void;
};

export const ButtonSignUp = ({
  btnContent,
  customClass,
  disabled = false,
  customFunction = () => {},
}: ButtonProps) => {
  return (
    <button
      className={` 
        ${classes.signUp__button}
        ${classes[customClass]}
        ${customClass}
        bg-moonBlack
        text-lg
      `}
      onClick={customFunction}
      disabled={disabled}
    >
      {btnContent}
    </button>
  );
};
