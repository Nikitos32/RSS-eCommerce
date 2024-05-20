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
import { CheckboxSignUp } from '../UI/CheckboxSignUp/CheckboxSignUp';
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
      [InputNames.BILLING_COUNTRY]: {
        value: countryArray[0],
        correct: true,
      },
      [InputNames.BILLING_POSTAL_CODE]:
        {
          value: '',
          correct: false,
          setError: function () {},
        },
      [InputNames.BILLING_CITY]: {
        value: '',
        correct: false,
      },
      [InputNames.BILLING_STREET]: {
        value: '',
        correct: false,
      },
      [InputNames.SHIPPING_COUNTRY]: {
        value: countryArray[0],
        correct: true,
      },
      [InputNames.SHIPPING_POSTAL_CODE]:
        {
          value: '',
          correct: false,
          setError: function () {},
        },
      [InputNames.SHIPPING_CITY]: {
        value: '',
        correct: false,
      },
      [InputNames.SHIPPING_STREET]: {
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
  const [
    checkboxAddress,
    setcheckboxAddress,
  ] = useState(false);

  const clearPostalCode = (
    address: string,
    newInputData: InputDataType
  ) => {
    const inputDataValue =
      newInputData[
        address as keyof InputDataType
      ];
    inputDataValue.value = '';
    inputDataValue.correct = false;

    if (!inputDataValue.setError)
      return;
    inputDataValue.setError('');
  };

  interface CheckFormParams {
    newInputData?: InputDataType;
    oneAddress?: boolean;
  }

  const checkForm = ({
    newInputData = inputData,
    oneAddress = checkboxAddress,
  }: CheckFormParams) => {
    let resultCheck = false;
    Object.keys(newInputData).forEach(
      (key) => {
        if (oneAddress) {
          console.log(checkboxAddress);
          const c = key.includes(
            InputNames.SHIPPING
          );
          if (c) return;
        }
        const { correct } =
          newInputData[
            key as keyof InputDataType
          ];
        if (!correct)
          resultCheck = true;
      }
    );

    setButtonDisabled(resultCheck);
  };

  const updateInputData = (
    key: string
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

        if (
          key ===
            InputNames.BILLING_COUNTRY ||
          key ===
            InputNames.SHIPPING_COUNTRY
        ) {
          const typeAdress =
            key.replace('Country', '');
          clearPostalCode(
            `${typeAdress}${InputNames.POSTAL_CODE}`,
            newInputData
          );
          setButtonDisabled(true);
        } else {
          checkForm({ newInputData });
        }
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
                  '^(([^<>()[\\].,;:\\s@\']+(\\.[^<>()[\\].,;:\\s@\']+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
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
            {checkboxAddress
              ? 'Address'
              : 'Billing Address'}
          </h3>
          <CheckboxSignUp
            label="use one adress"
            checked={checkboxAddress}
            className="w-full place-content-center"
            onChange={() => {
              checkForm({
                oneAddress:
                  !checkboxAddress,
              });
              setcheckboxAddress(
                !checkboxAddress
              );
            }}
          />
          <InputConatiner
            content="Country"
            type={InputType.SELECT}
            customClass={
              'signUp__country'
            }
            options={countryArray}
            inputDataValue={
              inputData.BillingCountry
            }
            setInputDataValue={updateInputData(
              InputNames.BILLING_COUNTRY
            )}
          />
          <InputConatiner
            content="Postal Code"
            type={InputType.TEXT}
            customClass={
              'signUp__postalCode'
            }
            patterns={patternPostalCode.get(
              inputData.BillingCountry
                .value
            )}
            inputDataValue={
              inputData.BillingPostalCode
            }
            setInputDataValue={updateInputData(
              InputNames.BILLING_POSTAL_CODE
            )}
          />
          <InputConatiner
            content="City"
            type={InputType.TEXT}
            customClass={'signUp__city'}
            patterns={namePattern}
            inputDataValue={
              inputData.BillingCity
            }
            setInputDataValue={updateInputData(
              InputNames.BILLING_CITY
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
              inputData.BillingStreet
            }
            setInputDataValue={updateInputData(
              InputNames.BILLING_STREET
            )}
          />
        </section>
        <section
          className={`
          ${classes.signUp__data} 
          ${classes.signUp__adress}
          ${checkboxAddress ? 'hidden' : ''}
        `}
        >
          <h3
            className={`
              ${classes.signUp__adressTitle}
              text-xl font-medium
              `}
          >
            Shipping Address
          </h3>
          <InputConatiner
            content="Country"
            type={InputType.SELECT}
            customClass={
              'signUp__country'
            }
            options={countryArray}
            inputDataValue={
              inputData.ShippingCountry
            }
            setInputDataValue={updateInputData(
              InputNames.SHIPPING_COUNTRY
            )}
          />
          <InputConatiner
            content="Postal Code"
            type={InputType.TEXT}
            customClass={
              'signUp__postalCode'
            }
            patterns={patternPostalCode.get(
              inputData.ShippingCountry
                .value
            )}
            inputDataValue={
              inputData.ShippingPostalCode
            }
            setInputDataValue={updateInputData(
              InputNames.SHIPPING_POSTAL_CODE
            )}
          />
          <InputConatiner
            content="City"
            type={InputType.TEXT}
            customClass={'signUp__city'}
            patterns={namePattern}
            inputDataValue={
              inputData.ShippingCity
            }
            setInputDataValue={updateInputData(
              InputNames.SHIPPING_CITY
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
              inputData.ShippingStreet
            }
            setInputDataValue={updateInputData(
              InputNames.SHIPPING_STREET
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
                billingCountry:
                  countryCode.get(
                    inputData
                      .BillingCountry
                      .value
                  ),
                billingPostalCode:
                  inputData
                    .BillingPostalCode
                    .value,
                billingCity:
                  inputData.BillingCity
                    .value,
                billingStreet:
                  inputData
                    .BillingStreet
                    .value,
                shippingCountry:
                  countryCode.get(
                    inputData
                      .ShippingCountry
                      .value
                  ),
                shippingPostalCode:
                  inputData
                    .ShippingPostalCode
                    .value,
                shippingCity:
                  inputData.ShippingCity
                    .value,
                shippingStreet:
                  inputData
                    .ShippingStreet
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
