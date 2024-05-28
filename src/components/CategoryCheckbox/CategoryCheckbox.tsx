interface CategoryCheckboxProps {
  category: string;
  amountItems: number;
}

export const CategoryCheckbox = ({
  category,
  amountItems,
}: CategoryCheckboxProps) => {
  return (
    <div className="flex w-60 justify-between">
      <div>
        <input type="checkbox" id={category} />
        <label htmlFor={category}>{category}</label>
      </div>
      <p className="bg-slate-300 p-1 rounded h-5 flex items-center">
        {amountItems}
      </p>
    </div>
  );
};
