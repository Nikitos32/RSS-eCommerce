import { useState } from 'react';
import { TETX_TYPE_FOR_INPUT } from '../../constants';
import { Button } from '../UI/Button/Button';
import { Input } from '../UI/Input/Input';
import classes from './loginPage.module.css';

export const LoginPage = () => {
  const [hovered, setHover] =
    useState<boolean>(false);

  const handleHover = () => {
    setHover(!hovered);
  };

  return (
    <section
      className={
        classes.centeredSection
      }
    >
      <Input
        type={TETX_TYPE_FOR_INPUT}
      />
      <Button
        btnContent="Меняет цвет и курсор при нажатии"
        isHovered={hovered}
        handleHover={handleHover}
      />
    </section>
  );
};
