interface SortSelectProps {
  handleCurrentSort: (event: React.ChangeEvent) => void;
}

export const SortSelect = ({ handleCurrentSort }: SortSelectProps) => {
  return (
    <select
      name="sortSelect"
      id="sortSelect"
      className="border-2 border-slate-600 rounded p-2"
      onChange={(event) => handleCurrentSort(event)}
    >
      <option value="">No sort</option>
      <option value="ASC">a-z</option>
      <option value="DESC">z-a</option>
    </select>
  );
};
