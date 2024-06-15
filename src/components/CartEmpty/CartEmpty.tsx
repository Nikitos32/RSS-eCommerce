export const CartEmpty = () => {
  return (
    <article className="containerMain flex flex-col justify-center items-center">
      <img src="../../../public\svg\CartEmpty.svg" alt="Cart" />
      <h1 className="text-xl font-semibold">Cart is empty</h1>
      <h3 className="text-moonNeutral-600">
        {"But it's never too late to fix it :)"}
      </h3>
    </article>
  );
};
