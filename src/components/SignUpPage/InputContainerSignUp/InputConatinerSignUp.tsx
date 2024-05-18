import classes from './InputConatinerSignUp.module.css';
import { useState } from 'react';
import { InputType } from '../../../type/enums/SignUpEnums';
import { InputSignUp } from '../../UI/InputSignUp/InputSignUp';
import { SelectSignUp } from '../../UI/SelectSignUp/SelectSignUp';
import { InputDataValueType } from '../../../type/types/signUpType';

type InputConatinerProps = {
  content: string;
  type: InputType;
  customClass: string;
  inputDataValue: InputDataValueType;
  setInputDataValue: (
    newValue: string,
    newCorrect: boolean
  ) => void;
  patterns?: PatternSignUp[];
  options?: string[];
};

export type PatternSignUp = {
  pattern: string;
  errorMessage: string;
};

export const InputConatiner = ({
  content,
  type,
  customClass,
  inputDataValue,
  setInputDataValue,
  patterns,
  options,
}: InputConatinerProps) => {
  const [inputValue, setInputValue] =
    useState(inputDataValue.value);
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
    let newCorrect: boolean = true;

    if (patterns) {
      error = patterns
        ?.map(
          ({
            pattern,
            errorMessage,
          }) => {
            newCorrect = new RegExp(
              pattern
            ).test(value);
            return newCorrect
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

    setInputDataValue(
      value,
      newCorrect
    );
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
      {type === InputType.SELECT &&
      options ? (
        <SelectSignUp
          customClass={
            'signUp__country'
          }
          options={options}
          value={inputValue}
          valueChange={handleChange}
        />
      ) : (
        <InputSignUp
          type={type}
          customClass={customClass}
          placeholder={`${content}...`}
          value={inputValue}
          valueChange={handleChange}
        />
      )}
      <div>{textError}</div>
    </div>
  );
};