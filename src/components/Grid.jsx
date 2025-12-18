import Title from "./elements/Title";

function Grid({ expenses, title, options }) {
  const getTypeDescription = (id) =>
    options.find((opt) => opt.id === Number(id))?.description || "-";

  return (
    <div className="flex flex-col gap-2 px-2">
      <div className="flex justify-center">
        <Title>{title}</Title>
      </div>

      <div className="flex flex-col border border-slate-200 rounded-md py-2 px-4 gap-4 min-h-[300px]">
        {expenses.length === 0 ? (
          <span className="self-center">No data was found</span>
        ) : (
          <div className="flex flex-col gap-2">
            {/* <div className="flex font-medium border-b pb-2">
              <span className="flex-1 text-left">Description</span>
              <span className="flex-1 text-center">Value</span>
              <span className="flex-1 text-end">Exp. Type</span>
            </div> */}
            <div>
              {expenses.map((expense) => (
                <div className="flex" key={expense.id}>
                  <span className="flex-1 text-left">
                    {expense.description}
                  </span>
                  <span className="flex-1 text-center">
                    {expense.value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                  <span className="flex-1 text-end">
                    {getTypeDescription(expense.type)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Grid;
