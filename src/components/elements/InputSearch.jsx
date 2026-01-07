import { SearchIcon } from "lucide-react";
export default function InputSearch({ placeholder, onChange }) {
  return (
    <div className="relative w-full">
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
      <input
        onChange={onChange}
        type="text"
        className="border border-slate-200 w-full h-12 rounded-xl outline-black pl-12 p-4"
        placeholder={placeholder}
      ></input>
    </div>
  );
}
