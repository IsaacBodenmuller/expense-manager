function Button(props) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`${props.color} hover:${props.hoverColor} rounded-md px-2 py-2 text-white shadow-md`}
    >
      {props.children}
    </button>
  );
}
export default Button;
