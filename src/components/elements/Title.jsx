function Title({ children, onClick }) {
  return (
    <h1 className="self-center font-medium" onClick={onClick}>
      {children}
    </h1>
  );
}
export default Title;
