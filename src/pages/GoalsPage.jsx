import Title from "../components/elements/Title";
import Button from "../components/elements/Button";
import TextWithIcon from "../components/elements/TextWithIcon";
import GoalCard from "../components/elements/GoalCard";
import Card from "../components/elements/Card";
import { Plus } from "lucide-react";

export default function GoalsPage({ goals, pages, onGoPage, onModalAction }) {
  const metasTotal = goals.reduce(
    (acc, item) => acc + Number(item.targetValue / 100),
    0
  );
  const economizadoTotal = goals.reduce(
    (acc, item) => acc + Number(item.achievedValue / 100 || 0),
    0
  );
  const metasConcluidas = goals.filter((item) => item.isFinished).length;
  const values = {
    metasTotal,
    economizadoTotal,
    metasConcluidas:
      metasConcluidas.toString() + " de " + goals.length.toString(),
  };

  const cards = ["metasTotal", "economizadoTotal", "metasConcluidas"];

  return (
    <div className="flex flex-col h-full pr-4 relative py-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 overflow-y-auto">
      <div className="flex items-center gap-4 pt-2">
        <div className={`text-sm text-slate-500 cursor-pointer`}>
          {pages.map((page, index) => (
            <span
              onClick={() => {
                if (page === "Home") onGoPage("home");
              }}
              key={page}
              className={`${
                index === pages.length - 1
                  ? "underline font-medium cursor-default"
                  : ""
              }`}
            >
              {page}
              {index < pages.length - 1 && " > "}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-center gap-8 pt-4">
          <div className="flex flex-col gap-2">
            <div>
              <Title size="xl" weight="medium" position="start">
                Metas Financeiras
              </Title>
              <span className="text-slate-500 text-base">
                Acompanhe seus objetivos de economia
              </span>
            </div>
            <Button onClick={() => onModalAction(true, "goal")} color="purple">
              <TextWithIcon iconSize="4" side="left" icon={Plus}>
                Nova Meta
              </TextWithIcon>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {cards.map((type) => (
            <Card key={type} side="left" type={type} value={values[type]} />
          ))}
        </div>

        <div className="flex flex-col gap-6">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      </div>
    </div>
  );
}
