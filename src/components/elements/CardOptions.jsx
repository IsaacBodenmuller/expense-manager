import { Trash2Icon, PencilIcon, TrendingUp } from "lucide-react";

export default function CardOptions({
  goal,
  isFinished,
  onDeleteGoal,
  onFinishGoal,
  onEditGoal,
}) {
  return (
    <div className="rounded-lg bg-white shadow-lg border border-slate-200 px-4 py-3 absolute h-fit w-32 right-10 mt-9 content-center">
      <div className="gap-2 justify-between flex flex-col">
        <div onClick={() => onEditGoal(goal)} className="flex gap-4">
          <PencilIcon className="size-4 self-center" />
          <span className="text-sm self-center">Editar</span>
        </div>
        {!isFinished && (
          <div onClick={() => onFinishGoal(goal.id)} className="flex gap-4">
            <TrendingUp className="size-4 self-center text-green-500" />
            <span className="text-sm self-center text-green-500">
              Finalizar
            </span>
          </div>
        )}
        <div onClick={() => onDeleteGoal(goal.id)} className="flex gap-4">
          <Trash2Icon className="size-4 text-red-500 self-center" />
          <span className="text-sm self-center text-red-500">Excluir</span>
        </div>
      </div>
    </div>
  );
}
