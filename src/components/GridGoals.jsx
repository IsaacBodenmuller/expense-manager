import Title from "./elements/Title";
import TextWithIcon from "./elements/TextWithIcon";
import { ArrowRight } from "lucide-react";

export default function GridGoals({ goals, title, onGoPage }) {
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
        <div></div>
      )}
    </div>
  );
}
