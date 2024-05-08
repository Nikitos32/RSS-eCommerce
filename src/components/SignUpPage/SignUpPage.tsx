import { FormEvent } from 'react';
import { Button } from '../UI/ButtonSignUp/ButtonSignUp';
import {
  Input,
  InputType,
} from '../UI/InputSignUp/InputSignUp';

export const SignUpPage = () => {
  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
  };

  return (
    <article className="sign-up">
      <form
        action=""
        onSubmit={handleSubmit}
      >
        <Input
          type={InputType.TEXT}
          className={'sign-up__input'}
          placeholder="Enter..."
        />
        <Button
          btnContent="SignUp"
          customClass="sign-up__button-send"
          customFunction={() => {}}
        />
      </form>
    </article>
  );
};
