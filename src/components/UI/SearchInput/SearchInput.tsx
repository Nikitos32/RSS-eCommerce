import { CiSearch } from 'react-icons/ci';

export const SearchInput = () => {
  return (
    <div className="flex justify-center items-center gap-1">
      <input
        type="search"
        placeholder="Search ..."
        className="outline-none border-b-2 border-slate-600"
      />
      <CiSearch className="cursor-pointer" size={25} />
    </div>
  );
};
