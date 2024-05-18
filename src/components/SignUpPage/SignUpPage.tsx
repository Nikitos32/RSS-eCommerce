import {
  FormEvent,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
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
      [InputNames.NAME]: {
        value: '',
        correct: false,
      },
      [InputNames.SURNAME]: {
        value: '',
        correct: false,
      },
      [InputNames.EMAIL]: {
        value: '',
        correct: false,
      },
      [InputNames.PASSWORD]: {
        value: '',
        correct: false,
      },
      [InputNames.BIRTH]: {
        value: '2000-01-01',
        correct: true,
      },
      [InputNames.COUNTRY]: {
        value: countryArray[0],
        correct: true,
      },
      [InputNames.POSTCODE]: {
        value: '',
        correct: false,
      },
      [InputNames.CITY]: {
        value: '',
        correct: false,
      },
      [InputNames.STREET]: {
        value: '',
        correct: false,
      },
    };

  const [inputData, setInputArray] =
    useState(initialInputData);
  const [
    ButtonDisabled,
    setButtonDisabled,
  ] = useState(true);

  const updateInputData = (
    key: InputNames
  ) => {
    return async function (
      newValue: string,
      newCorrect: boolean
    ) {
      setInputArray((prevState) => {
        const newInputData = {
          ...prevState,
          [key]: {
            value: newValue,
            correct: newCorrect,
          },
        };

        let resultCheck =
          key === InputNames.COUNTRY
            ? true
            : false;
        Object.keys(
          newInputData
        ).forEach((key) => {
          const { correct } =
            newInputData[
              key as InputNames
            ];
          if (!correct)
            resultCheck = true;
        });
        setButtonDisabled(resultCheck);
        return newInputData;
      });
    };
  };

  return (
    <article
      className={`${classes.signUp} font-Inter`}
    >
      <form
        className={classes.signUp__form}
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-medium font-Inter">
          SignUp
        </h1>
        <section
          className={`${classes.signUp__data} ${classes.signUp__UserData}`}
        >
          <InputConatiner
            content="Name"
            type={InputType.TEXT}
            customClass={'signUp__name'}
            patterns={namePattern}
            inputDataValue={
              initialInputData.Name
            }
            setInputDataValue={updateInputData(
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
            inputDataValue={
              initialInputData.Surname
            }
            setInputDataValue={updateInputData(
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
            inputDataValue={
              initialInputData.Email
            }
            setInputDataValue={updateInputData(
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
            inputDataValue={
              initialInputData.Password
            }
            setInputDataValue={updateInputData(
              InputNames.PASSWORD
            )}
          />
        </section>
        <section
          className={`${classes.signUp__data} ${classes.signUp__birth}`}
        >
          <InputConatiner
            content="Date of birth"
            type={InputType.DATA}
            customClass={
              'signUp__dataBirthday'
            }
            inputDataValue={
              initialInputData.DateOfBirth
            }
            setInputDataValue={updateInputData(
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
            inputDataValue={
              initialInputData.Country
            }
            setInputDataValue={updateInputData(
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
              inputData.Country.value
            )}
            inputDataValue={
              initialInputData.PostalCode
            }
            setInputDataValue={updateInputData(
              InputNames.POSTCODE
            )}
          />
          <InputConatiner
            content="City"
            type={InputType.TEXT}
            customClass={'signUp__city'}
            patterns={namePattern}
            inputDataValue={
              initialInputData.City
            }
            setInputDataValue={updateInputData(
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
            inputDataValue={
              initialInputData.Street
            }
            setInputDataValue={updateInputData(
              InputNames.STREET
            )}
          />
        </section>
        <section
          className={
            classes.sugnUp__buttonContainer
          }
        >
          <Link
            to="/signin"
            className={`${classes.signUp__toLink}`}
          >
            <span
              className={
                classes.signUp__linkArow
              }
            >
              {'< '}
            </span>
            {'to Login'}
          </Link>
          <ButtonSignUp
            btnContent="SignUp"
            customClass="signUp__buttonSend"
            customFunction={() => {}}
            disabled={ButtonDisabled}
          />
        </section>
      </form>
    </article>
  );
};
