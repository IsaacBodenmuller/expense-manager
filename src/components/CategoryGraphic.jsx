import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Title from "./elements/Title";
import CustomTooltip from "./elements/CustomTooltip";

const COLORS = [
  "#ef4444", // red-500
  "#f97316", // orange-500
  "#eab308", // yellow-500
  "#22c55e", // green-500
  "#14b8a6", // teal-500
  "#3b82f6", // blue-500
  "#6366f1", // indigo-500
  "#8b5cf6", // violet-500
  "#a855f7", // purple-500
  "#ec4899", // pink-500
  "#f43f5e", // rose-500
];

export default function CategoryGraphic({ expenses, options }) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentMonthName = now.toLocaleString("pt-BR", { month: "long" });
  const currentYear = now.getFullYear();

  const expensesMonth = expenses.filter((e) => {
    const d = new Date(e.date);
    return (
      (e.isExpense || e.isOther) &&
      d.getMonth() === currentMonth &&
      d.getFullYear() === currentYear
    );
  });

  const totalGeral = expensesMonth.reduce((sum, e) => sum + e.value, 0);

  const data = options
    .filter((opt) => opt.isExpense || opt.isOther)
    .map((opt) => {
      const total = expensesMonth
        .filter((e) => e.type === opt.id)
        .reduce((sum, e) => sum + e.value, 0);

      return {
        name: opt.description,
        value: total,
        percent: totalGeral > 0 ? total / totalGeral : 0,
      };
    })
    .filter((item) => item.value > 0);

  return (
    <div className="flex flex-col gap-4 mt-4 h-full border border-slate-200 rounded-xl px-4 py-6">
      <Title weight="medium" size="base">
        Despesas por Categoria ({currentMonthName})
      </Title>
      <div className="flex justify-between">
        <div className="max-w-40 w-full max-h-48 content-center">
          {data.length === 0 ? (
            <div className="w-fit h-fit flex text-center items-center justify-center text-slate-400 text-sm">
              Nenhum dado encontrado
            </div>
          ) : (
            <ResponsiveContainer className="pb-2 min-h-40">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  innerRadius={45}
                  paddingAngle={2}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                      cursor="pointer"
                    />
                  ))}
                </Pie>

                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="flex flex-col gap-2 justify-center min-w-32">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2 text-sm">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <div className="flex justify-between w-full">
                <span className="text-slate-600 text-xs">{item.name}</span>
                <span className="text-xs font-medium self-end">
                  {(item.percent * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
