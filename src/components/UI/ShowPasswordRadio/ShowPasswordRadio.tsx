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
      className={`w-10`}
      onClick={() => handleVisibility()}
    >
      <img
        className={`w-6 h-6`}
        src={`/public/png/${!visible ? 'close' : 'open'}Eye.png`}
        alt="eye"
      />
    </div>
  );
};
