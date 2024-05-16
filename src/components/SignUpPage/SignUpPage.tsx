import {
  FormEvent,
  useState,
} from 'react';
import { ButtonSignUp } from '../UI/ButtonSignUp/ButtonSignUp';
import {
  InputType,
  InputNames,
} from '../../type/enums/SignUpEnums';
import { InputConatiner } from './InputContainerSignUp/InputConatinerSignUp';
import { InputDataType } from '../../type/types/signUpType';
import { countryArray } from '../../type/value/country';
import {
  namePattern,
  patternPostalCode,
} from '../../type/value/signUpPatterns';
import classes from './signUpPage.module.css';

export const SignUpPage = () => {
  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
  };

  const initialInputData: InputDataType =
    {
      [InputNames.NAME]: '',
      [InputNames.SURNAME]: '',
      [InputNames.EMAIL]: '',
      [InputNames.PASSWORD]: '',
      [InputNames.BIRTH]: '2000-01-01',
      [InputNames.COUNTRY]:
        countryArray[0],
      [InputNames.POSTCODE]: '',
      [InputNames.CITY]: '',
      [InputNames.STREET]: '',
    };

  const [InputData, setInputArray] =
    useState(initialInputData);

  const updateInputData = (
    key: InputNames
  ) => {
    return function (newValue: string) {
      setInputArray((prevState) => ({
        ...prevState,
        [key]: newValue,
      }));
    };
  };

  return (
    <article className={classes.signUp}>
      <form
        className={classes.signUp__form}
        onSubmit={handleSubmit}
      >
        <h1>SignUp</h1>
        <section
          className={`${classes.signUp__data} ${classes.signUp__UserData}`}
        >
          <InputConatiner
            content="Name"
            type={InputType.TEXT}
            customClass={'signUp__name'}
            patterns={namePattern}
            setMapValue={updateInputData(
              InputNames.NAME
            )}
          />
          <InputConatiner
            content="Surname"
            type={InputType.TEXT}
            customClass={
              'signUp__surname'
            }
            patterns={namePattern}
            setMapValue={updateInputData(
              InputNames.SURNAME
            )}
          />
          <InputConatiner
            content="Email"
            type={InputType.EMAIL}
            customClass={
              'signUp__email'
            }
            patterns={[
              {
                pattern:
                  '^(([^<>()[\\].,;:\\s@\']+(\\.[^<>()[\\].,;:\\s@\']+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
                errorMessage:
                  'Invalid email format',
              },
            ]}
            setMapValue={updateInputData(
              InputNames.EMAIL
            )}
          />
          <InputConatiner
            content="Password"
            type={InputType.PASSWORD}
            customClass={
              'signUp__password'
            }
            patterns={[
              {
                pattern: '.{7,}.*',
                errorMessage:
                  'must be longer than 8 characters',
              },
              {
                pattern: '^.{0,15}$',
                errorMessage:
                  'must be less than 16 character',
              },
              {
                pattern: '[0-9]',
                errorMessage:
                  'need number',
              },
              {
                pattern: '[a-zA-Z]',
                errorMessage:
                  'need english letters',
              },
              {
                pattern: '[A-Z]',
                errorMessage:
                  'don`t have uppercase',
              },
            ]}
            setMapValue={updateInputData(
              InputNames.PASSWORD
            )}
          />
          <InputConatiner
            content="Date of birth"
            type={InputType.DATA}
            customClass={
              'signUp__dataBirthday'
            }
            setMapValue={updateInputData(
              InputNames.BIRTH
            )}
          />
        </section>
        <section
          className={`${classes.signUp__data} ${classes.signUp__adress}`}
        >
          <h3
            className={
              classes.signUp__adressTitle
            }
          >
            Adress
          </h3>
          <InputConatiner
            content="Country"
            type={InputType.SELECT}
            customClass={
              'signUp__country'
            }
            options={countryArray}
            setMapValue={updateInputData(
              InputNames.COUNTRY
            )}
          />
          <InputConatiner
            content="Postal Code"
            type={InputType.TEXT}
            customClass={
              'signUp__postalCode'
            }
            patterns={patternPostalCode.get(
              InputData.Country
            )}
            setMapValue={updateInputData(
              InputNames.POSTCODE
            )}
          />
          <InputConatiner
            content="City"
            type={InputType.TEXT}
            customClass={'signUp__city'}
            patterns={namePattern}
            setMapValue={updateInputData(
              InputNames.CITY
            )}
          />
          <InputConatiner
            content="Street"
            type={InputType.TEXT}
            customClass={
              'signUp__street'
            }
            patterns={namePattern}
            setMapValue={updateInputData(
              InputNames.STREET
            )}
          />
        </section>
        <ButtonSignUp
          btnContent="SignUp"
          customClass="sign-up__button-send"
          customFunction={() => {}}
        />
      </form>
    </article>
  );
};
