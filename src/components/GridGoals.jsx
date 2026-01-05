import { useState } from "react";
import { ArrowRight, Target } from "lucide-react";
import Title from "./elements/Title";
import TextWithIcon from "./elements/TextWithIcon";

const COLORS = {
  blue: {
    border: "border-blue-300",
    bg: "bg-blue-200",
    progressBg: "bg-blue-400",
    text: "text-blue-600",
  },
  green: {
    border: "border-green-300",
    bg: "bg-green-200",
    progressBg: "bg-green-400",
    text: "text-green-600",
  },
  purple: {
    border: "border-purple-300",
    bg: "bg-purple-200",
    progressBg: "bg-purple-400",
    text: "text-purple-600",
  },
  orange: {
    border: "border-orange-300",
    bg: "bg-orange-200",
    progressBg: "bg-orange-400",
    text: "text-orange-600",
  },
  pink: {
    border: "border-pink-300",
    bg: "bg-pink-200",
    progressBg: "bg-pink-400",
    text: "text-pink-600",
  },
};

export default function GridGoals({ goals, title, onGoPage }) {
  const [selectedId, setSelectedId] = useState(null);

  const goalsToShow = goals
    .filter((g) => !g.isFinished)
    .concat(goals.filter((g) => g.isFinished))
    .slice(0, 3);
  const dateFormatted = (date) => {
    const [year, month, day] = date.split("-").map(Number);
    const monthNames = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];
    const formatted = `Prazo: ${day} de ${monthNames[month - 1]}`;
    return `${formatted} de ${year}`;
  };

  return (
    <div className="flex flex-col gap-2 px-4 py-4 border rounded-2xl border-slate-200">
      <div className="flex justify-between gap-4 px-2">
        <Title size="base" weight="medium">
          {title}
        </Title>
        {goals.length > 3 && (
          <div
            onClick={() => onGoPage("goals")}
            className="hover:bg-gray-100 py-1 px-3 rounded-md text-slate-500 hover:text-black cursor-pointer"
          >
            <TextWithIcon
              iconSize="3"
              fontSize="xs"
              side="right"
              icon={ArrowRight}
            >
              Ver todas
            </TextWithIcon>
          </div>
        )}
      </div>
      {goals.length === 0 ? (
        <div className="flex flex-col">
          <span className="self-center text-slate-400 text-sm">
            Nenhum dado encontrado
          </span>
        </div>
      ) : (
        goalsToShow.map((goal) => {
          const cardColor = COLORS[goal.color] || COLORS.green;
          const progress =
            goal.targetValue > 0
              ? Number(
                  Math.min(
                    (goal.achievedValue / goal.targetValue) * 100,
                    100
                  ).toFixed(2)
                )
              : 0;
          console.log(goal);
          console.log(cardColor);
          return (
            <div
              key={goal.id}
              onClick={() =>
                setSelectedId((prev) => (prev === goal.id ? null : goal.id))
              }
              className={`flex flex-col w-full h-40 px-4 py-4 border rounded-xl gap-2 cursor-pointer hover:bg-slate-50
                ${selectedId === goal.id ? "shadow-md" : "border-slate-200"}
              `}
            >
              <div className="flex flex-col gap-3">
                <div className="flex justify-between pr-2">
                  <div className="flex">
                    <div
                      className={`size-12 rounded-xl justify-items-center content-center ${cardColor.bg}`}
                    >
                      <Target className={cardColor.text} />
                    </div>
                    <div className="flex flex-col pl-3">
                      <Title size="base" weight="medium">
                        {goal.description}
                      </Title>
                      <div className="flex gap-1">
                        <span className="text-gray-400 text-sm font-normal">
                          {dateFormatted(goal.targetDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      {Number(goal.achievedValue / 100).toLocaleString(
                        "pt-BR",
                        {
                          style: "currency",
                          currency: "BRL",
                        }
                      )}
                    </span>
                    <span className="text-sm text-black">
                      {Number(goal.targetValue / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                  <div
                    className={`w-full h-2 rounded-full overflow-hidden ${cardColor.bg}`}
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${cardColor.progressBg}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-end">
                    <span
                      className={`text-[13px] text-gray-700`}
                    >{`${progress}% concluído`}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
