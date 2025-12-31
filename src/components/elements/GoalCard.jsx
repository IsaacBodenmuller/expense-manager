import { Target, Calendar, Ellipsis } from "lucide-react";
import Title from "./Title";

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

export default function GoalCard({ goal }) {
  const color = COLORS[goal.color] || COLORS.blue;
  const progress =
    goal.targetValue > 0
      ? Math.min((goal.achievedValue / goal.targetValue) * 100, 100)
      : 0;

  const dateFormatted = (date) => {
    const [year, month, day] = date.split("-").map(Number);
    const monthNames = [
      "jan",
      "fev",
      "mar",
      "abr",
      "mai",
      "jun",
      "jul",
      "ago",
      "set",
      "out",
      "nov",
      "dez",
    ];
    const formatted = `${day} de ${monthNames[month - 1]}`;
    return `${formatted}, ${year}`;
  };

  return (
    <div
      className={`flex flex-col w-full h-40 px-4 py-4 border-[3px] rounded-xl gap-4 ${
        !goal.isFinished ? color.border : "border-green-500 bg-green-50"
      }`}
    >
      <div className="flex justify-between pr-2">
        <div className="flex">
          <div
            className={`size-12 rounded-xl justify-items-center content-center ${color.bg}`}
          >
            <Target className={color.text} />
          </div>
          <div className="flex flex-col pl-3">
            <Title size="base" weight="medium">
              {goal.description}
            </Title>
            <div className="flex gap-1">
              <Calendar className="text-gray-400 size-4 self-center" />
              <span className="text-gray-400 text-sm font-normal">
                {dateFormatted(goal.targetDate)}
              </span>
            </div>
          </div>
        </div>
        <div className="content-center justify-items-center hover:bg-slate-200 rounded-lg size-8">
          <Ellipsis className="size-4" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span>
            {Number(goal.achievedValue / 100).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          <span>
            {Number(goal.targetValue / 100).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
        <div className={`w-full h-3 rounded-full overflow-hidden ${color.bg}`}>
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              goal.isFinished ? "bg-green-500" : color.progressBg
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
}
