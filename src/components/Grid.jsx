import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import Title from "./elements/Title";
import { useState } from "react";

function Grid({ expenses, title, options }) {
  const [selectedId, setSelectedId] = useState(null);

  const getTypeDescription = (id) =>
    options.find((opt) => opt.id === Number(id))?.description || "-";

  const getIcon = (id) =>
    options.find((opt) => opt.id === Number(id))?.icon || "-";

  const formattedDate = (date) => {
    const [year, month, day] = date.split("-").map(Number);
    const currentYear = new Date().getFullYear();
    const monthNames = [
      "jan",
      "fev",
      "mar",
      "abr",
      "mai",
      "jun",
      "jul",
      "ago",
      "set",
      "out",
      "nov",
      "dez",
    ];
    const formatted = `${day} ${monthNames[month - 1]}`;
    return year === currentYear ? formatted : `${formatted} de ${year}`;
  };

  return (
    <div className="flex flex-col gap-2 px-2 py-4 border rounded-lg border-slate-200">
      <div className="flex justify-center gap-4">
        <Title>{title}</Title>
        {expenses.length != 0 && (
          <div className="flex justify-center gap-4">
            <span className="text-sm self-center">Ver todas</span>
            <ArrowRight className="size-4 self-center" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {expenses.length === 0 ? (
          <span className="self-center text-slate-400">
            Nenhum dado encontrado
          </span>
        ) : (
          expenses.map((expense) => (
            <div
              key={expense.id}
              onClick={() => setSelectedId(expense.id)}
              className={`flex items-center rounded-xl py-2 px-4 gap-4 h-[60px] cursor-pointer transition-colors ${
                selectedId === expense.id
                  ? "bg-slate-200"
                  : "bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <div className="bg-white shadow rounded-lg w-[40px] h-[40px] text-center content-center">
                {getIcon(expense.type)}
              </div>

              <div>
                <span className="flex-1 text-left">{expense.description}</span>
                <div className="flex gap-2 text-wrap">
                  <span className="flex-1 text-right">
                    {getTypeDescription(expense.type)}
                  </span>

                  <>•</>

                  <span>{formattedDate(expense.date)}</span>
                </div>
              </div>

              <div
                className={`flex justify-center gap-1 ${
                  expense.isExpense ? "text-red-500" : "text-green-500"
                }`}
              >
                <>{expense.isExpense ? <ArrowDownRight /> : <ArrowUpRight />}</>
                <span>
                  {expense.value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Grid;
