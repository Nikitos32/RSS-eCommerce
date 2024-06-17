import { Link } from 'react-router-dom';

export const CartEmpty = () => {
  return (
    <article className="containerMain flex flex-col justify-center items-center">
      <img src="svg\CartEmpty.svg" alt="Cart" />
      <h1 className="text-xl font-semibold">Cart is empty</h1>
      <h3 className="text-moonNeutral-600">
        {"But it's never too late to fix it :)"}
      </h3>
      <Link
        to="../catalog"
        className={`text-moonBlack mt-[5%] transition-[gap] flex gap-1 hover:gap-4 hover:no-underline text-lg`}
      >
        <span>{'< '}</span>
        {'to Catalog'}
      </Link>
    </article>
  );
};
