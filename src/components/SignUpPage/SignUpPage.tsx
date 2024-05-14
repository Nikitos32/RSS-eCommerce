import { FormEvent } from 'react';
import { ButtonSignUp } from '../UI/ButtonSignUp/ButtonSignUp';
import { InputType } from '../UI/InputSignUp/InputSignUp';
import {
  InputConatiner,
  PatternSignUp,
} from '../UI/InputContainerSignUp/InputConatinerSignUp';
import classes from './signUpPage.module.css';

export const SignUpPage = () => {
  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
  };

  const namePattern: PatternSignUp[] = [
    {
      pattern: '[A-Z].*',
      errorMessage:
        'first letter must be capitalised',
    },
    {
      pattern: '^.{1}[a-z]*$',
      errorMessage:
        'after first letter must be lowercase or hyphen',
    },
    {
      pattern: '.{2,}.*',
      errorMessage:
        'minimum characters 2',
    },
  ];

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
          />
          <InputConatiner
            content="Surname"
            type={InputType.TEXT}
            customClass={
              'signUp__surname'
            }
            patterns={namePattern}
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
          />
          <InputConatiner
            content="Date of birth"
            type={InputType.DATA}
            customClass={
              'signUp__dataBirthday'
            }
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
            content="City"
            type={InputType.TEXT}
            customClass={'signUp__city'}
            patterns={namePattern}
          />
          <InputConatiner
            content="Street"
            type={InputType.TEXT}
            customClass={
              'signUp__street'
            }
            patterns={namePattern}
          />
          <InputConatiner
            content="Postal Code"
            type={InputType.NUMBER}
            customClass={
              'signUp__postalCode'
            }
          />
          <InputConatiner
            content="Country"
            type={InputType.TEXT}
            customClass={
              'signUp__country'
            }
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
