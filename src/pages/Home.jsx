import CategoryGraphic from "../components/CategoryGraphic";
import LinearGraphic from "../components/LinearGraphic";
import Button from "../components/elements/Button";
import Title from "../components/elements/Title";
import TextWithIcon from "../components/elements/TextWithIcon";
import GridTransactions from "../components/GridTransactions";
import GridCards from "../components/GridCards";
import GridGoals from "../components/GridGoals";
import { useEffect } from "react";
import { Plus } from "lucide-react";

export default function Home({
  expenses,
  goals,
  options,
  onModalAction,
  onGoPage,
}) {
  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  return (
    <div className="flex flex-col h-full pr-4 relative py-8 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 overflow-y-auto">
      <div className="flex flex-col justify-center gap-8">
        <div className="flex flex-col gap-2">
          <div>
            <Title size="xl" weight="medium" position="start">
              Home
            </Title>
            <span className="text-slate-500 text-base">
              Visão geral das suas finanças
            </span>
          </div>
          <Button
            onClick={() => onModalAction(true, "newExpense")}
            color="darkGray"
          >
            <TextWithIcon iconSize="4" side="left" icon={Plus}>
              Nova Transação
            </TextWithIcon>
          </Button>
        </div>

        <GridCards expenses={expenses} />

        <LinearGraphic expenses={expenses} />

        <CategoryGraphic expenses={expenses} options={options} />

        <GridTransactions
          expenses={expenses}
          title="Transações Recentes"
          options={options}
          onGoPage={onGoPage}
          className="shadow-md"
        />

        <GridGoals
          goals={goals}
          title="Metas Financeiras"
          onGoPage={onGoPage}
        />
      </div>
    </div>
  );
}
