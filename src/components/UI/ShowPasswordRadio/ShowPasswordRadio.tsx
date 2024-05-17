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
      onClick={() => handleVisibility()}
    >
      <img
        className={classes.eyePng}
        src={`/public/png/${!visible ? 'close' : 'open'}Eye.png`}
        alt="eye"
      />
    </div>
  );
};
