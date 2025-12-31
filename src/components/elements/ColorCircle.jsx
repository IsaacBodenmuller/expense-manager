export default function ColorCircle({ color, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`${
        isSelected && "border-[5px] border-gray-400/70"
      } content-center justify-items-center rounded-full size-12 `}
    >
      <div
        className={`bg-${color}-400 size-8 rounded-full cursor-pointer`}
      ></div>
    </div>
  );
}
