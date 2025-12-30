import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Target,
} from "lucide-react";
import Title from "./Title";

export default function Card({
  type,
  value,
  selected,
  onClick,
  side = "right",
}) {
  const display = {
    left: "justify-start gap-4",
    right: "justify-between",
  };

  const style = {
    total: "bg-blue-100 border-blue-300 hover:bg-blue-200",
    receita: "bg-green-100 border-green-300 hover:bg-green-200",
    despesa: "bg-red-100 border-red-300 hover:bg-red-200",
    economizado: "bg-purple-100 border-purple-300 hover:bg-purple-200",
    metasTotal: "bg-purple-100 border-purple-300 hover:bg-purple-200",
    economizadoTotal: "bg-green-100 border-green-300 hover:bg-green-200",
    metasConcluidas: "bg-blue-100 border-blue-300 hover:bg-blue-200",
  };
  const selectedStyle = {
    total: "bg-blue-100 border-blue-300 shadow-blue-300/40",
    receita: "bg-green-100 border-green-300 shadow-green-300/40",
    despesa: "bg-red-100 border-red-300 shadow-red-300/40",
    economizado: "bg-purple-100 border-purple-300 shadow-purple-300/40",
    metasTotal: "bg-purple-100 border-purple-300 shadow-purple-300/40",
    economizadoTotal: "bg-green-100 border-green-300 shadow-green-300/40",
    metasConcluidas: "bg-blue-100 border-blue-300 shadow-blue-300/40",
  };
  const icon = {
    total: <Wallet />,
    receita: <TrendingUp />,
    despesa: <TrendingDown />,
    economizado: <PiggyBank />,
    metasTotal: <Target />,
    economizadoTotal: <TrendingUp />,
    metasConcluidas: <Target />,
  };
  const colorIcon = {
    total: "bg-blue-500",
    receita: "bg-green-500",
    despesa: "bg-red-500",
    economizado: "bg-purple-500",
    metasTotal: "bg-purple-500",
    economizadoTotal: "bg-green-500",
    metasConcluidas: "bg-blue-500",
  };
  const title = {
    total: "Saldo Total",
    receita: "Receitas",
    despesa: "Despesas",
    economizado: "Economizado",
    metasTotal: "Total das Metas",
    economizadoTotal: "Total Economizado",
    metasConcluidas: "Metas Concluídas",
  };
  return (
    <div
      onClick={onClick}
      className={`
        border rounded-xl w-full h-24 flex ${
          display[side]
        } p-6 content-center cursor-pointer transition-all duration-200
        ${selected ? selectedStyle[type] + " shadow-md" : style[type]}
        `}
    >
      {side === "left" && (
        <div
          className={`${colorIcon[type]} justify-items-center content-center text-white size-12 rounded-xl`}
        >
          {icon[type]}
        </div>
      )}

      <div className="flex flex-col">
        <span className="text-xs text-slate-500">{title[type]}</span>
        <Title size="xl2" weight="semibold">
          {value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Title>
      </div>

      {side === "right" && (
        <div
          className={`${colorIcon[type]} justify-items-center content-center text-white size-12 rounded-xl`}
        >
          {icon[type]}
        </div>
      )}
    </div>
  );
}
