import { useState } from 'react';
import classes from './buttonSignUp.module.css';

type ButtonProps = {
  btnContent: string;
  customClass: string;
  customFunction: () => void;
};

export const ButtonSignUp = ({
  btnContent,
  customClass,
  customFunction,
}: ButtonProps) => {
  const [hovered, setHover] =
    useState<boolean>(false);

  return (
    <button
      className={` 
        ${classes.signUp__button}
        ${hovered ? classes.signUp__button_active : ''}
        ${customClass}
      `}
      onClick={() => {
        setHover(!hovered);
        customFunction();
      }}
    >
      {btnContent}
    </button>
  );
};
