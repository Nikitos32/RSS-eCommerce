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
import {
  countryArray,
  countryCode,
} from '../../type/value/country';
import {
  namePattern,
  patternPostalCode,
  patternPassword,
  patternStreet,
} from '../../type/value/signUpPatterns';
import classes from './signUpPage.module.css';
import { REGEX_FOR_EMAIL_INPUT } from '../../constants';

export const SignUpPage = () => {
  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log(inputData);
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
        setError: function () {},
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

  const [inputData, setInputData] =
    useState(initialInputData);

  const [
    ButtonDisabled,
    setButtonDisabled,
  ] = useState(true);

  const updateInputData = (
    key: InputNames
  ) => {
    return function (
      newValue: string,
      newCorrect: boolean
    ) {
      setInputData((prevState) => {
        const newInputData = {
          ...prevState,
          [key]: {
            value: newValue,
            correct: newCorrect,
          },
        };

        let resultCheck = false;
        if (
          key === InputNames.COUNTRY &&
          inputData.PostalCode.setError
        ) {
          resultCheck = true;
          newInputData.PostalCode.value =
            '';
          newInputData.PostalCode.correct =
            false;
          inputData.PostalCode.setError(
            ''
          );
        } else {
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
        }

        setButtonDisabled(resultCheck);
        return newInputData;
      });
    };
  };

  return (
    <article
      className={`${classes.signUp} font-Inter text-moonBlack`}
    >
      <form
        className={classes.signUp__form}
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-medium">
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
              inputData.Name
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
              inputData.Surname
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
                  REGEX_FOR_EMAIL_INPUT,
                errorMessage:
                  'Incorrect email format',
              },
            ]}
            inputDataValue={
              inputData.Email
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
            patterns={patternPassword}
            inputDataValue={
              inputData.Password
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
              inputData.DateOfBirth
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
            className={`
              ${classes.signUp__adressTitle}
              text-xl font-medium
              `}
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
              inputData.Country
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
              inputData.PostalCode
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
              inputData.City
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
            patterns={patternStreet}
            inputDataValue={
              inputData.Street
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
            className={`${classes.signUp__toLink} text-lg`}
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
            customFunction={() => {
              const sendSignUp = {
                name: inputData.Name
                  .value,
                surname:
                  inputData.Surname
                    .value,
                email:
                  inputData.Email.value,
                password:
                  inputData.Password
                    .value,
                dateOfBirth:
                  inputData.DateOfBirth
                    .value,
                country:
                  countryCode.get(
                    inputData.Country
                      .value
                  ),
                postalCode:
                  inputData.PostalCode
                    .value,
                city: inputData.City
                  .value,
                street:
                  inputData.Street
                    .value,
              };

              console.log(sendSignUp);
            }}
            disabled={ButtonDisabled}
          />
        </section>
      </form>
    </article>
  );
};
