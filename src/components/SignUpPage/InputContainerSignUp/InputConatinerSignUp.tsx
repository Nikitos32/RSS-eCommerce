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
  const [textError, setTextError] =
    useState('');

  if (content == 'Postal Code') {
    inputDataValue.setError = (
      newError: string
    ) => {
      setTextError(newError);
    };
  }

  const handleChange = (
    value: string
  ) => {
    let error: string = '';
    let newCorrect: boolean = true;

    if (patterns) {
      const checkResult =
        patterns?.find(
          ({ pattern }) =>
            !new RegExp(pattern).test(
              value
            )
        );
      error = checkResult
        ? `*${checkResult.errorMessage}`
        : '';
      newCorrect = !error;
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

      if (age < 14) {
        error =
          '*Must be at least 14 years of age';
        newCorrect = false;
      }
    }

    setInputDataValue(
      value,
      newCorrect
    );
    setTextError(error);
  };

  return (
    <div
      className={`
        ${classes.signUp__inputContainer}
        ${classes[customClass]}
        `}
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
          value={inputDataValue.value}
          valueChange={handleChange}
        />
      ) : (
        <InputSignUp
          type={type}
          customClass={'signUp__input'}
          placeholder={`${content}...`}
          value={inputDataValue.value}
          valueChange={handleChange}
        />
      )}
      <div className="text-red-500 text-xs h-3">
        {textError}
      </div>
    </div>
  );
};
