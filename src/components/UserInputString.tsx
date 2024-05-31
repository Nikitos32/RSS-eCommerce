import { Dispatch, SetStateAction } from 'react';
import { makeIdFromLabel } from '../utils';
import { BsInfoCircle } from 'react-icons/bs';

export type UserInputState = {
  value: string;
  valid: boolean;
  visibleClue: boolean;
  focus: boolean;
};

type UserInputStringProps = {
  type: 'text' | 'password';
  label?: string;
  placeHolder?: string;
  autocomplete: 'on' | 'off';
  state: UserInputState;
  setState: Dispatch<SetStateAction<UserInputState>>;
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
          props.state.valid ? '' : ' border-red-500'
        }`}
        id={id}
        type={props.type}
        value={props.state?.value}
        autoComplete="off"
        onChange={(e) =>
          props.setState({ ...props.state, value: e.target.value })
        }
        placeholder={props.placeHolder}
        aria-invalid={props.state.valid ? 'false' : 'true'}
        aria-describedby={cluesId}
        onFocus={() => props.setState({ ...props.state, focus: true })}
        onBlur={() => props.setState({ ...props.state, focus: false })}
        ref={props.elementUseRef}
      />
      <div
        id={cluesId}
        className={`mt-1 py-1 flex flex-row rounded-md bg-moonNeutral-200 md:max-w-2xl md:mx-auto justify-start items-center gap-2 text-sm ${
          props.state.visibleClue ? ' ' : ' hidden'
        }`}
      >
        <BsInfoCircle className="ml-2 text-xl" />
        {props.clues}
      </div>
    </>
  );
}

export default UserInputString;
