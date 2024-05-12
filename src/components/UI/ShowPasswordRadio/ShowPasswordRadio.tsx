import classes from './ShowPasswordRadio.module.css';

interface ShowPasswordRadioProps {
  handleVisibility: () => void;
  visible: boolean;
}

export const ShowPasswordRadio = ({
  handleVisibility,
  visible,
}: ShowPasswordRadioProps) => {
  return (
    <div
      className={classes.backgroundEye}
      style={{
        backgroundImage: `url("/public/png/${!visible ? 'close' : 'open'}Eye.png")`,
      }}
      onClick={() => handleVisibility()}
    ></div>
  );
};
