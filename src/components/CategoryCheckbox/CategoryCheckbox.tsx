interface CategoryCheckboxProps {
  category: string;
  amountItems: number;
  value: string;
  handleCategories: (event: React.ChangeEvent) => void;
}

export const CategoryCheckbox = ({
  category,
  value,
  amountItems,
  handleCategories,
}: CategoryCheckboxProps) => {
  return (
    <div className="flex justify-between pr-4">
      <div>
        <input
          type="checkbox"
          id={category}
          value={value}
          onChange={(event) => handleCategories(event)}
        />
        <label htmlFor={category}>{category}</label>
      </div>
      <p className="bg-slate-300 p-1 rounded h-5 flex items-center">
        {amountItems}
      </p>
    </div>
  );
};
