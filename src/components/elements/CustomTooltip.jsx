export default function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;

  const { name, value, percent, fill } = payload[0].payload;
  console.log[payload[0]];

  return (
    <div className="rounded-xl bg-white shadow-lg border border-slate-200 px-4 py-2">
      <div className="gap-2">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: fill }}
        />
        <span className="font-medium text-slate-700">{name}</span>
      </div>

      <div className="text-sm text-slate-600">
        <div>
          {value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
        <div className="text-slate-400 font-light text-xs">
          {(percent * 100).toFixed(1)}%
        </div>
      </div>
    </div>
  );
}
