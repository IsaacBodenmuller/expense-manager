import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import Title from "./elements/Title";
import { useState } from "react";
import TextWithIcon from "./elements/TextWithIcon";

export default function GridTransactions({
  expenses,
  title,
  options,
  onGoPage,
}) {
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

  const expensesGrid = (expenses) => {
    return expenses
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  };
  const lastExpenses = expensesGrid(expenses);

  return (
    <div className="flex flex-col gap-2 px-2 py-4 border rounded-2xl border-slate-200">
      <div className="flex justify-between gap-4 px-2">
        <Title size="base" weight="medium">
          {title}
        </Title>
        {expenses.length > 5 && (
          <div
            onClick={() => onGoPage("transactions")}
            className="hover:bg-gray-100 py-1 px-3 rounded-md text-slate-500 hover:text-black cursor-pointer"
          >
            <TextWithIcon
              iconSize="3"
              fontSize="xs"
              side="right"
              icon={ArrowRight}
            >
              Ver todas
            </TextWithIcon>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 overflow-hidden">
        {expenses.length === 0 ? (
          <span className="self-center text-slate-400 text-sm">
            Nenhum dado encontrado
          </span>
        ) : (
          lastExpenses.map((expense) => (
            <div
              key={expense.id}
              onClick={() =>
                setSelectedId((prev) =>
                  prev === expense.id ? null : expense.id
                )
              }
              className={` flex items-center rounded-xl py-2 px-4 gap-4 h-[65px] cursor-pointer transition-colors justify-between ${
                selectedId === expense.id
                  ? "bg-slate-200"
                  : "bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <div className="flex gap-4 min-w-0">
                <div className="bg-white shadow rounded-lg min-w-[40px] w-[40px] h-[40px] text-center content-center self-center">
                  {getIcon(expense.type)}
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-left font-medium truncate">
                    {expense.description}
                  </span>
                  <div className="flex gap-2 text-wrap text-xs">
                    <span className="text-left">
                      {getTypeDescription(expense.type)} •{" "}
                      {formattedDate(expense.date)}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div
                  className={`flex justify-end gap-1 ${
                    expense.isExpense ? "text-red-500" : "text-green-500"
                  }`}
                >
                  <>
                    {expense.isExpense ? <ArrowDownRight /> : <ArrowUpRight />}
                  </>
                  <span>
                    {expense.value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
