type CardProps = {
  children: JSX.Element;
  bg?: string;
};
function Card({
  children,
  bg = 'bg-gray-100',
}: CardProps) {
  return (
    <div
      className={`${bg} p-6 shadow-md`}
    >
      {children}
    </div>
  );
}

export default Card;
