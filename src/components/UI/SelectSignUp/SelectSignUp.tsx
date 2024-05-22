import { useState } from 'react';
import classes from './SelectSignUp.module.css';

type SelectProps = {
  customClass: string;
  options: string[];
  value: string;
  valueChange: (newValue: string) => void;
};

export const SelectSignUp = ({
  customClass,
  options,
  value,
  valueChange,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (newValue: string) => {
    valueChange(newValue);
    setIsOpen(false);
  };

  return (
    <div className={`${classes.select} ${classes[customClass]}`}>
      <div
        className={`${classes.select__field} ${isOpen ? classes.select__field_active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value}
      </div>
      {isOpen && (
        <ul className={classes.select__options}>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className={`
                ${classes.select__option}
                ${option === value ? classes.select__option_selected : ''}
              `}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
