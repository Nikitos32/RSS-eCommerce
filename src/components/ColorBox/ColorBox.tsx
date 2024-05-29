interface ColorBoxProps {
  color: string;
}

export const ColorBox = ({ color }: ColorBoxProps) => {
  return (
    <button
      className={`${color} rounded-full size-6 border border-black border-solid`}
    ></button>
  );
};
