import {
  InputType,
  MIN_PASSWORD_LENGTH,
  REGEX_FOR_PASSWORD_INPUT,
  STYLE_FOR_PASSWORD_INPUT,
} from '../../../constants';
import { Input } from '../Input/Input';
import { ShowPasswordRadio } from '../ShowPasswordRadio/ShowPasswordRadio';
import classes from './passwordInput.module.css';

interface PasswordInputProps {
  isPasswordVisible: boolean;
  handleVisibility: () => void;
  password: string;
  handleInput: (
    event: React.ChangeEvent
  ) => void;
}

export const PasswordInput = ({
  isPasswordVisible,
  handleVisibility,
  password,
  handleInput,
}: PasswordInputProps) => {
  return (
    <section
      className={
        classes.passwordSection
      }
    >
      <div
        className={
          classes.wrapperPasswordInput
        }
      >
        <Input
          placeholder="Password..."
          additionalClass={
            STYLE_FOR_PASSWORD_INPUT
          }
          isPasswordVisible={
            isPasswordVisible
          }
          regex={
            REGEX_FOR_PASSWORD_INPUT
          }
          minLength={
            MIN_PASSWORD_LENGTH
          }
          handleInput={handleInput}
          type={InputType.PASSWORD}
          value={password}
        />
        <ShowPasswordRadio
          visible={isPasswordVisible}
          handleVisibility={
            handleVisibility
          }
        />
      </div>
    </section>
  );
};
