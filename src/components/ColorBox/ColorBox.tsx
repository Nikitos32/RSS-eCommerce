interface ColorBoxProps {
  color: string;
}

export const ColorBox = ({ color }: ColorBoxProps) => {
  return (
    <button
      className={`${color} rounded-full w-6 h-6 border border-black border-solid`}
    ></button>
  );
};
