export default function CustomLineTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;

  const income = payload.find((p) => p.dataKey === "income")?.value || 0;
  const expense = payload.find((p) => p.dataKey === "expense")?.value || 0;

  return (
    <div className="rounded-xl bg-white shadow-lg border border-slate-200 px-4 py-3">
      <div className="text-sm font-medium text-slate-700 mb-2 capitalize text-start">
        {label.replace(".", "")}
      </div>

      <div className="flex flex-col gap-1 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-green-600">
            Receitas:{" "}
            {income.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-red-500">
            Despesas:{" "}
            {expense.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
