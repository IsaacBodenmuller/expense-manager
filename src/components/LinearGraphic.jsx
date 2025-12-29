import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Title from "./elements/Title";
import CustomLineTooltip from "./elements/CustomLineTooltip";

export default function LinearGraphic({ expenses }) {
  const now = new Date();

  const months = Array.from({ length: 6 }).map((_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return {
      key: `${date.getFullYear()}-${date.getMonth()}`,
      month: date.toLocaleString("pt-BR", { month: "short" }),
      year: date.getFullYear(),
      expense: 0,
      income: 0,
    };
  });

  expenses.forEach((e) => {
    const d = new Date(e.date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;

    const month = months.find((m) => m.key === key);
    if (!month) return;

    if (e.isExpense) {
      month.expense += e.value;
    } else {
      month.income += e.value;
    }
  });

  const hasData = months.some((m) => m.value > 0 || m.income > 0);

  return (
    <div className="w-full border border-slate-200 rounded-xl px-4 py-4">
      <div>
        <Title size="base" weight="medium">
          Visão Mensal
        </Title>
      </div>
      <div className="text-center self-center text-sm text-slate-400">
        <div className="flex w-full items-center justify-center h-[220px]">
          {!hasData ? (
            <div className="w-fit h-fit flex text-center items-center justify-center text-slate-400 text-sm">
              Nenhum dado encontrado
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={months}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomLineTooltip />} />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Despesa"
                />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Receita"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
