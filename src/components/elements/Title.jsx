export default function Title({
  children,
  position = "start",
  size,
  weight,
  onClick,
}) {
  const textSize = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    xl2: "text-2xl",
    xl3: "text-3xl",
  };
  const textWeight = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };
  const textPosition = {
    start: "self-start",
    center: "self-center",
    end: "self-end",
  };
  return (
    <h1
      className={`${textPosition[position]} ${textSize[size]} ${textWeight[weight]}`}
      onClick={onClick}
    >
      {children}
    </h1>
  );
}
