export default function Button(props) {
  const style = {
    white: "bg-white hover:bg-slate-100 text-slate-500",
    darkGray: "bg-gray-800 hover:bg-gray-700 text-white",
  };
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`${
        style[props.color]
      } rounded-xl px-2 py-2 border border-slate-300 shadow-md w-full flex gap-2 items-center justify-center min-h-[45px]`}
    >
      {props.children}
    </button>
  );
}
