import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import Title from "./Title";

export default function Card({ type, value, selected, onClick }) {
  const style = {
    total: "bg-blue-100 border-blue-300 hover:bg-blue-200",
    receita: "bg-green-100 border-green-300 hover:bg-green-200",
    despesa: "bg-red-100 border-red-300 hover:bg-red-200",
    economizado: "bg-purple-100 border-purple-300 hover:bg-purple-200",
  };
  const selectedStyle = {
    total: "bg-blue-100 border-blue-300 shadow-blue-300/40",
    receita: "bg-green-100 border-green-300 shadow-green-300/40",
    despesa: "bg-red-100 border-red-300 shadow-red-300/40",
    economizado: "bg-purple-100 border-purple-300 shadow-purple-300/40",
  };
  const icon = {
    total: <Wallet />,
    receita: <TrendingUp />,
    despesa: <TrendingDown />,
    economizado: <PiggyBank />,
  };
  const colorIcon = {
    total: "bg-blue-500",
    receita: "bg-green-500",
    despesa: "bg-red-500",
    economizado: "bg-purple-500",
  };
  const title = {
    total: "Saldo Total",
    receita: "Receitas",
    despesa: "Despesas",
    economizado: "Economizado",
  };
  return (
    <div
      onClick={onClick}
      className={`
        border rounded-xl w-full h-24 flex justify-between p-6 content-center cursor-pointer transition-all duration-200
        ${selected ? selectedStyle[type] + " shadow-md" : style[type]}
        `}
    >
      <div className="flex flex-col gap-1">
        <span className="text-xs text-slate-500">{title[type]}</span>
        <Title size="xl2" weight="semibold">
          {value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Title>
      </div>
      <div
        className={`${colorIcon[type]} justify-items-center content-center text-white size-12 rounded-xl`}
      >
        {icon[type]}
      </div>
    </div>
  );
}
