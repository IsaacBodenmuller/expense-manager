function InputValue(props) {
  return (
    <div className="flex flex-col relative">
      <label className="bg-white absolute -top-2 left-2 h-5 w-fit text-left px-4 text-slate-500 text-xs">
        {props.title}
      </label>
      <input
        className="rounded-xl px-4 py-2 pt-3 bg-white border border-slate-200 outline-slate-300 text-slate-400 font-light "
        type={props.type}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

export default InputValue;
