import Title from "./elements/Title";
import { TrashIcon } from "lucide-react";

function Grid({ expenses, title, options }) {
  const getTypeDescription = (id) =>
    options.find((opt) => opt.id === Number(id))?.description || "-";

  const getTypeColor = (id) =>
    options.find((opt) => opt.id === Number(id))?.color || "bg-slate-200";

  return (
    <div className="flex flex-col gap-2 px-2">
      <div className="flex justify-center">
        <Title>{title}</Title>
      </div>

      <div className="flex flex-col gap-2">
        {expenses.length === 0 ? (
          <span className="self-center text-slate-400">No data was found</span>
        ) : (
          expenses.map((expense) => (
            <div
              key={expense.id}
              className={`flex items-center border border-slate-200 rounded-md py-2 px-4 gap-4 ${getTypeColor(
                expense.type
              )}`}
            >
              <span className="flex-1 text-left">{expense.description}</span>

              <span className="flex-1 text-center">
                {expense.value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>

              <span className="flex-1 text-right">
                {getTypeDescription(expense.type)}
              </span>

              <TrashIcon className="cursor-pointer text-red-500 hover:scale-110 transition" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Grid;
