import classes from './InputConatinerSignUp.module.css';
import { useState } from 'react';
import {
  InputSignUp,
  InputType,
} from '../InputSignUp/InputSignUp';

type InputConatinerProps = {
  content: string;
  type: InputType;
  customClass: string;
  patterns?: PatternSignUp[];
};

export type PatternSignUp = {
  pattern: string;
  errorMessage: string;
};

export const InputConatiner = ({
  content,
  type,
  customClass,
  patterns,
}: InputConatinerProps) => {
  const [inputValue, setInputValue] =
    useState('');
  const [textError, setTextError] =
    useState('');
  const [timeoutId, setTimeoutId] =
    useState<NodeJS.Timeout | null>(
      null
    );

  const handleChange = (
    value: string
  ) => {
    setInputValue(value);
    if (!patterns) return;
    const error = patterns
      ?.map(
        ({ pattern, errorMessage }) => {
          const resultTest = new RegExp(
            pattern
          ).test(value);
          return resultTest
            ? ''
            : `${errorMessage}\n`;
        }
      )
      .join(' ');
    setTextError(error);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(
      () => {
        setTextError('');
      },
      error === '' ? 0 : 2000
    );
    setTimeoutId(newTimeoutId);
  };

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
        value={inputValue}
        valueChange={handleChange}
      />
      <div>{textError}</div>
    </div>
  );
};
