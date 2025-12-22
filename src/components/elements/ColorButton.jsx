import { ArrowUpRight, ArrowDownRight } from "lucide-react";

function ColorButton(props) {
  const icon =
    props.direction === "up" ? (
      <ArrowUpRight />
    ) : props.direction === "down" ? (
      <ArrowDownRight />
    ) : null;
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`${props.color} hover:${props.hoverColor} ${props.textColor} rounded-xl px-2 py-2 shadow-md w-full flex gap-2 items-center justify-center min-h-[45px]`}
    >
      {icon}
      {props.children}
    </button>
  );
}
export default ColorButton;
