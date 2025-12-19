import Title from "./elements/Title";

function Grid({ expenses, title, options }) {
  const getTypeDescription = (id) =>
    options.find((opt) => opt.id === Number(id))?.description || "-";

  return (
    <div className="flex flex-col gap-2 px-2 py-4 border rounded-lg border-slate-200">
      <div className="flex justify-center">
        <Title>{title}</Title>
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
              className={`flex items-center border border-slate-200 rounded-md py-2 px-4 gap-4`}
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
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Grid;
