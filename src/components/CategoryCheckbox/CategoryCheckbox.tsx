export const CategoryCheckbox = (category: string, amountItems: number) => {
  return (
    <>
      <label htmlFor={category}>{category}</label>
      <input type="checkbox" id={category} />
      <p>{amountItems}</p>
    </>
  );
};
