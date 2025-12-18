function Button(props) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="bg-green-400 hover:bg-green-500 rounded-md px-2 py-2 text-white shadow-md"
    >
      {props.children}
    </button>
  );
}
export default Button;
