import { useState } from "react";
import Card from "./elements/Card";

function GridCards({ expenses }) {
  const [selected, setSelected] = useState(null);

  const receita = expenses
    .filter((item) => !item.isExpense)
    .reduce((acc, item) => acc + item.value, 0);

  const despesa = expenses
    .filter((item) => item.isExpense)
    .reduce((acc, item) => acc + item.value, 0);

  const values = {
    receita,
    despesa,
    total: receita - despesa,
    economizado: 0,
  };

  const cards = ["total", "receita", "despesa", "economizado"];

  return (
    <div className="flex flex-col gap-4">
      {cards.map((type) => (
        <Card
          key={type}
          type={type}
          value={values[type]}
          selected={selected === type}
          onClick={() => setSelected((prev) => (prev === type ? null : type))}
        />
      ))}
    </div>
  );
}

export default GridCards;
