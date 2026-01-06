import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function InputOption({
  title,
  options,
  value,
  onChange,
  disabled = false,
  isTitle = true,
}) {
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);
  const [openUp, setOpenUp] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);
  useEffect(() => {
    if (!open || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;

    setOpenUp(spaceBelow < 260);
  }, [open, options.length]);

  const selected = options.find((opt) => opt.id === value) || null;
  const hasAllOptions = options.some((opt) => opt.id === 0);

  const borderOptionSelected = (index) => {
    if (index === 0) return "rounded-t-lg";
    if (index === options.length - 1) return "rounded-b-lg";
    return "rounded";
  };

  return (
    <div ref={wrapperRef} className="relative w-full ">
      {isTitle && (
        <label className="bg-white absolute -top-2 left-2 h-5 w-fit text-left px-4 text-slate-500 text-xs">
          {title}
        </label>
      )}
      <button
        disabled={disabled}
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between rounded-lg border px-4 py-3 bg-white transition"
      >
        <div className="flex items-center gap-3 h-3">
          {selected ? (
            <>
              {selected.icon && (
                <span className="text-lg">{selected.icon}</span>
              )}
              <span className="text-sm">{selected.description}</span>
            </>
          ) : (
            !hasAllOptions && (
              <span className="text-slate-400 text-sm">
                Selecione uma categoria
              </span>
            )
          )}
        </div>
        <ChevronDown className="size-4 text-slate-500" />
      </button>

      {open && (
        <div
          className={`
      absolute z-20 w-full bg-white border rounded-xl shadow-lg
      max-h-64 overflow-y-auto px-2 py-2
      ${openUp ? "bottom-full mb-2" : "top-full mt-2"}
    `}
        >
          {options.map((opt, index) => (
            <div
              key={opt.id}
              onClick={() => {
                onChange(opt.id);
                setOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-2 cursor-pointer transition hover:bg-slate-100 text-slate-700
                ${selected?.id === opt.id ? "bg-slate-200 justify-between" : ""}
                ${borderOptionSelected(index)}
                `}
            >
              <div className="flex gap-2">
                {opt.icon && <span className="text-lg">{opt.icon}</span>}
                <span className="text-sm self-center">{opt.description}</span>
              </div>
              {selected?.id === opt.id ? <Check className="size-4" /> : ""}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
