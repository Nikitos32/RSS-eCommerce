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
    useState(
      type === InputType.DATA
        ? '2000-01-01'
        : ''
    );
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
    let error: string = '';

    if (patterns) {
      error = patterns
        ?.map(
          ({
            pattern,
            errorMessage,
          }) => {
            const resultTest =
              new RegExp(pattern).test(
                value
              );
            return resultTest
              ? ''
              : `${errorMessage}\n`;
          }
        )
        .join(' ');
    } else if (
      type === InputType.DATA
    ) {
      const birthdate = new Date(value);
      const currentDate = new Date();

      let age =
        currentDate.getFullYear() -
        birthdate.getFullYear();
      const birthdateThisYear =
        new Date(
          currentDate.getFullYear(),
          birthdate.getMonth(),
          birthdate.getDate()
        );
      if (
        birthdateThisYear > currentDate
      )
        age -= 1;

      if (age < 14)
        error =
          'Must be at least 14 years of age';
    }

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
