function Title({ children, onClick }) {
  return (
    <h1 className="self-center font-medium text-lg" onClick={onClick}>
      {children}
    </h1>
  );
}
export default Title;
