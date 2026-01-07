import { Trash2Icon, PencilIcon } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ExpenseOptions({
  expense,
  onDeleteExpense,
  onEditExpense,
  onClose,
}) {
  const ref = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="rounded-lg bg-white shadow-lg border border-slate-200 px-4 py-3 absolute h-fit w-32 right-5 mt-3 content-center"
    >
      <div className="gap-2 justify-between flex flex-col">
        <div onClick={() => onEditExpense(expense)} className="flex gap-4">
          <PencilIcon className="size-4 self-center" />
          <span className="text-sm self-center">Editar</span>
        </div>
        <div onClick={() => onDeleteExpense(expense.id)} className="flex gap-4">
          <Trash2Icon className="size-4 text-red-500 self-center" />
          <span className="text-sm self-center text-red-500">Excluir</span>
        </div>
      </div>
    </div>
  );
}
