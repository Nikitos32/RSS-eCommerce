interface CategoryCheckboxProps {
  category: string;
  amountItems: number;
}

export const CategoryCheckbox = ({
  category,
  amountItems,
}: CategoryCheckboxProps) => {
  return (
    <div className="flex justify-between pr-4">
      <div>
        <input
          type="checkbox"
          id={category}
          value="266af93b-136f-456e-97c0-5d5ec9a922c6"
        />
        <label htmlFor={category}>{category}</label>
      </div>
      <p className="bg-slate-300 p-1 rounded h-5 flex items-center">
        {amountItems}
      </p>
    </div>
  );
};
