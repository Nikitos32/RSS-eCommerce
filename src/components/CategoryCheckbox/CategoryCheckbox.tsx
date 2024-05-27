interface CategoryCheckboxProps {
  category: string;
  amountItems: number;
}

export const CategoryCheckbox = ({
  category,
  amountItems,
}: CategoryCheckboxProps) => {
  return (
    <div className="flex">
      <input type="checkbox" id={category} />
      <label htmlFor={category}>{category}</label>
      <p>{amountItems}</p>
    </div>
  );
};
