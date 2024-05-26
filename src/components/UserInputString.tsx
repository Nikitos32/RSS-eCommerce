import { Dispatch, SetStateAction } from 'react';
import { makeIdFromLabel } from '../utils';
import { BsInfoCircle } from 'react-icons/bs';

type UserInputStringProps = {
  type: 'text' | 'password';
  label?: string;
  placeHolder?: string;
  autocomplete: 'on' | 'off';
  valueUseState: string;
  setValueUseState: Dispatch<SetStateAction<string>>;
  isValidValueUseState: boolean;
  isFocusUseState: boolean;
  setFocusUseState: Dispatch<SetStateAction<boolean>>;
  elementUseRef?: React.RefObject<HTMLInputElement>;
  clues?: JSX.Element;
};

/**
 * @description standard input component for user string fields
 * @param props
 * @returns
 */
function UserInputString(props: UserInputStringProps): JSX.Element {
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
        value={props.valueUseState}
        autoComplete="off"
        onChange={(e) => props.setValueUseState(e.target.value)}
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
      <div
        id={cluesId}
        className={`mt-1 py-1 flex flex-row rounded-md bg-moonNeutral-200 md:max-w-2xl md:mx-auto justify-start items-center gap-2 text-sm ${
          props.clues &&
          props.isFocusUseState &&
          (!props.valueUseState || !props.isValidValueUseState)
            ? ' '
            : ' hidden'
        }`}
      >
        <BsInfoCircle className="ml-2 text-xl" />
        {props.clues}
      </div>
    </>
  );
}

export default UserInputString;
