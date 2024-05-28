export const SortSelect = () => {
  return (
    <select
      name="sortSelect"
      id="sortSelect"
      className="border-2 border-slate-600 rounded p-2"
    >
      <option value="price in desc">price in desc</option>
      <option value="price in asc">price in asc</option>
      <option value="a-z">a-z</option>
      <option value="z-a">z-a</option>
    </select>
  );
};
