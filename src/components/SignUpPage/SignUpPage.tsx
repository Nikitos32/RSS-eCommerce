import { FormEvent } from 'react';
import { ButtonSignUp } from '../UI/ButtonSignUp/ButtonSignUp';
import { InputType } from '../UI/InputSignUp/InputSignUp';
import { InputConatiner } from '../UI/InputContainerSignUp/InputConatiner';
import classes from './signUpPage.module.css';

export const SignUpPage = () => {
  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
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
          />
          <InputConatiner
            content="Surname"
            type={InputType.TEXT}
            customClass={
              'signUp__surname'
            }
          />
          <InputConatiner
            content="Email"
            type={InputType.EMAIL}
            customClass={
              'signUp__email'
            }
          />
          <InputConatiner
            content="Password"
            type={InputType.PASSWORD}
            customClass={
              'signUp__password'
            }
          />
          <InputConatiner
            content="Data"
            type={InputType.DATA}
            customClass={
              'signUp__dataBirthday'
            }
          />
        </section>
        <section
          className={`${classes.signUp__data} ${classes.signUp__adress}`}
        >
          <h3>Adress</h3>
          <InputConatiner
            content="Street"
            type={InputType.TEXT}
            customClass={
              'signUp__street'
            }
          />
          <InputConatiner
            content="City"
            type={InputType.TEXT}
            customClass={'signUp__city'}
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
