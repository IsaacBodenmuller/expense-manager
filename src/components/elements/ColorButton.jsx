export default function ColorButton(props) {
  const style = {
    green: "bg-green-400 hover:bg-green-500 text-white border border-green-400",
    red: "bg-red-400 hover:bg-red-500 text-white border border-red-400",
    gray: "bg-slate-200 hover:bg-slate-300 text-slate-500 border border-slate-400",
    blue: "bg-blue-400 hover:bg-blue-500 text-white border border-blue-600",
    purple:
      "bg-purple-400 hover:bg-purple-500 text-white border border-purple-600",
    orange:
      "bg-orange-400 hover:bg-orange-500 text-white border border-orange-600",
    pink: "bg-pink-400 hover:bg-pink-500 text-white border border-pink-600",
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
