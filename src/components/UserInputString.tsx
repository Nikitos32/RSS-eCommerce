import { Dispatch, SetStateAction } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { makeIdFromLabel } from '../utils';

type UserInputStringProps = {
  type: 'text' | 'password';
  label?: string;
  placeHolder?: string;
  isRequired?: boolean;
  autocomplete: 'on' | 'off';
  valueUseState: string;
  setValueUseState: Dispatch<SetStateAction<string>>;
  isValidValueUseState: boolean;
  isFocusUseState: boolean;
  setFocusUseState: Dispatch<SetStateAction<boolean>>;
  elementUseRef?: React.RefObject<HTMLInputElement>;
  clues?: JSX.Element;
};

function UserInputString(props: UserInputStringProps) {
  const id = makeIdFromLabel(props.label || 'no label');
  const cluesId = `clues-${id}`;

  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {props.label}
      </label>
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          !props.valueUseState || props.isValidValueUseState
            ? ''
            : ' border-red-500'
        }`}
        id={id}
        type={props.type}
        autoComplete="off"
        onChange={(e) => props.setValueUseState(e.target.value)}
        required={props.isRequired}
        placeholder={props.placeHolder}
        aria-invalid={props.isValidValueUseState ? 'false' : 'true'}
        aria-describedby={cluesId}
        onFocus={
          props.setFocusUseState ? () => props.setFocusUseState(true) : () => {}
        }
        onBlur={
          props.setFocusUseState
            ? () => props.setFocusUseState(false)
            : () => {}
        }
        ref={props.elementUseRef}
      />
      <p
        id={cluesId}
        className={
          props.clues &&
          props.isFocusUseState &&
          (!props.valueUseState || ![props.isValidValueUseState])
            ? ' '
            : ' hidden'
        }
      >
        <FaInfoCircle className="inline mr-1" />
        {props.clues}
      </p>
    </>
  );
}

export default UserInputString;
