import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

function InputOption({ title, options, value, onChange }) {
  const buttonRef = useRef(null);
  const [openUp, setOpenUp] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;

    setOpenUp(spaceBelow < 260);
  }, [open]);

  const selected = options.find((opt) => opt.id === value);

  return (
    <div className="relative w-full">
      <label className="bg-white absolute -top-2 left-2 h-5 w-fit text-left px-4 text-slate-500 text-xs">
        {title}
      </label>
      {/* Botão */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between rounded-lg border px-4 py-3 bg-white transition"
      >
        <div className="flex items-center gap-3 h-3">
          {selected ? (
            <>
              <span className="text-lg">{selected.icon}</span>
              <span className="text-sm">{selected.description}</span>
            </>
          ) : (
            <span className="text-slate-400 text-sm">
              Selecione uma categoria
            </span>
          )}
        </div>
        <ChevronDown className="size-4 text-slate-500" />
      </button>

      {/* Lista */}
      {open && (
        <div
          className={`
      absolute z-20 w-full bg-white border rounded-xl shadow-lg
      max-h-64 overflow-y-auto
      ${openUp ? "bottom-full mb-2" : "top-full mt-2"}
    `}
        >
          {options.map((opt) => (
            <div
              key={opt.id}
              onClick={() => {
                onChange(opt.id);
                setOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-2 cursor-pointer transition hover:bg-slate-100 text-slate-700"
            >
              <span className="text-lg">{opt.icon}</span>
              <span className="text-sm">{opt.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default InputOption;

// export default CategorySelect;

// function InputOption({ title, options, value, onChange }) {
//   return (
//     <div className="flex flex-col relative">
//       <label className="bg-white absolute -top-2 left-2 h-5 w-fit text-left px-4 text-slate-500 text-xs">
//         {title}
//       </label>

//       <select
//         className="rounded-xl px-4 py-2 pt-3 bg-white border border-slate-200 outline-slate-300 text-slate-400 font-light"
//         value={value}
//         onChange={onChange}
//       >
//         <option value="" disabled className="border-slate-200">
//           Select an option
//         </option>

//         {options.map((option) => (
//           <option key={option.id} value={option.id}>
//             {option.icon} {option.description}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }
