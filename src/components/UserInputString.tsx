import { Dispatch, SetStateAction } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

type UserInputStringProps = {
  type: 'text' | 'password';
  label?: string;
  placeHolder?: string;
  isRequired?: boolean;
  valueUseState: string;
  setValueUseState: Dispatch<SetStateAction<string>>;
  isValidValueUseState: boolean;
  isFocusUseState: boolean;
  setFocusUseState: Dispatch<SetStateAction<boolean>>;
  clues?: JSX.Element;
};

const makeIdFromLabel = (label: string): string => {
  const partsForId = label
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .split(' ')
    .map((item) => item.toLowerCase());

  const randomPart = Math.random().toString(16).split('.')[1];

  return ['id', ...partsForId, randomPart].join('-');
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
        id="first-name"
        type="text"
        autoComplete="off"
        onChange={(e) => props.setValueUseState(e.target.value)}
        required={props.isRequired}
        placeholder={props.placeHolder}
        aria-invalid={props.isValidValueUseState ? 'false' : 'true'}
        aria-describedby={cluesId}
        onFocus={() => props.setFocusUseState(true)}
        onBlur={() => props.setFocusUseState(false)}
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
