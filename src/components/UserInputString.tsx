import { Dispatch, SetStateAction } from 'react';
import { makeIdFromLabel } from '../utils';
import { BsInfoCircle } from 'react-icons/bs';

type UserInputStringProps = {
  type: 'text' | 'password';
  label?: string;
  placeHolder?: string;
  autocomplete: 'on' | 'off';
  value: string;
  isValidValue: boolean;
  isCluesVisible: boolean;
  setValueUseState: Dispatch<SetStateAction<string>>;
  setFocusUseState: Dispatch<SetStateAction<boolean>>;
  clues?: JSX.Element;
  elementUseRef?: React.RefObject<HTMLInputElement>;
};

/**
 * @description standard input component for user string fields
 * @param props
 * @returns JSX.Element
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
          props.isValidValue ? '' : ' border-red-500'
        }`}
        id={id}
        type={props.type}
        value={props.value}
        autoComplete="off"
        onChange={(e) => props.setValueUseState(e.target.value)}
        placeholder={props.placeHolder}
        aria-invalid={props.isValidValue ? 'false' : 'true'}
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
          props.isCluesVisible ? ' ' : ' hidden'
        }`}
      >
        <BsInfoCircle className="ml-2 text-xl" />
        {props.clues}
      </div>
    </>
  );
}

export default UserInputString;
