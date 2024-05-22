import { Input } from '../UI/Input/Input';
import { InputType, REGEX_FOR_EMAIL_INPUT } from '../../constants';
import classes from './LoginFieldsetWithInputs.module.css';
import { useState } from 'react';
import { PasswordInput } from '../UI/PasswordInput/PasswordInput';

interface LoginFieldsetWithInputsProps {
  email: string;
  password: string;
  handleInput: (event: React.ChangeEvent) => void;
}

export const LoginFieldsetWithInputs = ({
  email,
  password,
  handleInput,
}: LoginFieldsetWithInputsProps) => {
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);

  const handleVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <fieldset className={classes.loginFormFieldset}>
      <Input
        placeholder="Email..."
        regex={REGEX_FOR_EMAIL_INPUT}
        handleInput={handleInput}
        type={InputType.EMAIL}
        value={email}
      />
      <PasswordInput
        password={password}
        handleVisibility={handleVisibility}
        isPasswordVisible={isPasswordVisible}
        handleInput={handleInput}
      />
    </fieldset>
  );
};
