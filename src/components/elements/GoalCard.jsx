import { Target, Calendar, Ellipsis } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Title from "./Title";
import CardOptions from "./CardOptions";

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

export default function GoalCard({
  goal,
  onUpdateGoal,
  onDeleteGoal,
  onFinishGoal,
  onEditGoal,
}) {
  const optionsRef = useRef(null);
  const [options, setOptions] = useState(false);
  const color = COLORS[goal.color] || COLORS.blue;

  useEffect(() => {
    function handleClickOutside(event) {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setOptions(false);
      }
    }

    if (options) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [options]);

  const progress =
    goal.targetValue > 0
      ? Number(
          Math.min((goal.achievedValue / goal.targetValue) * 100, 100).toFixed(
            2
          )
        )
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
      className={`flex flex-col w-full h-40 px-4 py-4 border-[3px] rounded-xl gap-2 ${
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
        <div
          ref={optionsRef}
          onClick={() => setOptions((prev) => !prev)}
          className="flex self-center justify-center hover:bg-slate-200 rounded-lg size-8 cursor-pointer"
        >
          <Ellipsis className="size-4 self-center" />
          {options && (
            <CardOptions
              goal={goal}
              isFinished={goal.isFinished}
              onDeleteGoal={onDeleteGoal}
              onFinishGoal={onFinishGoal}
              onEditGoal={onEditGoal}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">
            {Number(goal.achievedValue / 100).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          <span className="text-sm text-black">
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
        <div className="flex justify-between">
          <div>
            <span
              className={`text-sm ${
                goal.isFinished ? `text-green-600` : color.text
              }`}
            >{`${progress}% ${goal.isFinished ? "✅" : ""}`}</span>
          </div>
          <div className="flex gap-2">
            <div
              onClick={() => onUpdateGoal(goal.id, 5000)}
              className="hover:bg-slate-200 rounded-md border-slate-300 w-full border h-6 px-2 text-xs text-center content-center"
            >
              +R$50
            </div>
            <div
              onClick={() => onUpdateGoal(goal.id, 10000)}
              className="hover:bg-slate-200 rounded-md border-slate-300 w-full border h-6 px-2 text-xs text-center content-center"
            >
              +R$100
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
