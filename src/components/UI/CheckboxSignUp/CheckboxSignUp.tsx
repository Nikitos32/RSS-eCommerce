import { InputType } from '../../../type/enums/SignUpEnums';

type CheckboxProps = {
  label: string;
  checked: boolean;
  className: string;
  onChange: () => void;
};

export const CheckboxSignUp = ({
  label,
  checked,
  onChange,
  className,
}: CheckboxProps) => {
  return (
    <label className={`inline-flex items-center ${className}`}>
      <input
        type={InputType.CHECKBOX}
        className="form-checkbox h-5 w-5 text-blue-600"
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-2">{label}</span>
    </label>
  );
};
