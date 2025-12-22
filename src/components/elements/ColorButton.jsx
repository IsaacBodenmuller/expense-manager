import { ArrowUpRight, ArrowDownRight } from "lucide-react";

function ColorButton(props) {
  const icon =
    props.direction === "up" ? (
      <ArrowUpRight />
    ) : props.direction === "down" ? (
      <ArrowDownRight />
    ) : null;

  const style = {
    green:
      "bg-green-400 hover:bg-green-500 text-white shadow-lg shadow-green-500/50",
    red: "bg-red-400 hover:bg-red-500 text-white shadow-lg shadow-red-500/50",
    gray: "bg-slate-300 hover:bg-slate-400 text-slate-500",
  };

  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`${
        style[props.color]
      } rounded-xl px-2 py-2 w-full flex gap-2 items-center justify-center min-h-[45px]`}
    >
      {icon}
      {props.children}
    </button>
  );
}
export default ColorButton;
