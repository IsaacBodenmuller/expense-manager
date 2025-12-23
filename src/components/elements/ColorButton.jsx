function ColorButton(props) {
  const style = {
    green:
      "bg-green-400 hover:bg-green-500 text-white shadow-lg shadow-green-500/50",
    red: "bg-red-400 hover:bg-red-500 text-white shadow-lg shadow-red-500/50",
    gray: "bg-slate-200 hover:bg-slate-300 text-slate-500 border border-slate-400",
  };

  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`${
        style[props.color]
      } rounded-xl px-2 py-2 w-full flex gap-2 items-center justify-center min-h-[45px]`}
    >
      {props.children}
    </button>
  );
}
export default ColorButton;
