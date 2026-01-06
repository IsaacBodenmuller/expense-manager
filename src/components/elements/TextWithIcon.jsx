export default function TextWithIcon({
  side,
  icon: Icon,
  iconSize = "4",
  fontSize = "base",
  color,
  children,
}) {
  const size = {
    2: "size-2",
    3: "size-3",
    4: "size-4",
    5: "size-5",
  };
  const font = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    xl2: "text-2xl",
    xl3: "text-3xl",
  };
  return (
    <div className="flex items-center justify-center gap-2">
      {side === "left" && (
        <Icon className={`${size[iconSize]}  ${color ? color : ""}`} />
      )}

      <span className={`${font[fontSize]} ${color ? color : ""} self-center`}>
        {children}
      </span>

      {side === "right" && (
        <Icon className={`${size[iconSize]}  ${color ? color : ""}`} />
      )}
    </div>
  );
}
