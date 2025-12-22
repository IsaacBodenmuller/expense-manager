function InputOption({ title, options, value, onChange }) {
  return (
    <div className="flex flex-col relative">
      <label className="bg-white absolute -top-2 left-2 h-5 w-fit text-left px-4 text-slate-500 text-xs">
        {title}
      </label>

      <select
        className="rounded-xl px-4 py-2 pt-3 bg-white border border-slate-200 outline-slate-300 text-slate-400 font-light"
        value={value}
        onChange={onChange}
      >
        <option value="" disabled className="border-slate-200">
          Select an option
        </option>

        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.description}
          </option>
        ))}
      </select>
    </div>
  );
}
export default InputOption;
