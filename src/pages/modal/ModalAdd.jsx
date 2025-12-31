import Title from "../../components/elements/Title";
import AddExpense from "../../components/AddExpense";
import AddGoal from "../../components/AddGoal";
import { X } from "lucide-react";
import { motion } from "framer-motion";

export default function ModalAdd({
  onAdd,
  onModalAction,
  openModalWarning,
  options = [],
  type,
}) {
  const modalHeight = {
    expense: "min-h-[570px] sm:min-h-[570px] lg:min-h-[500px]",
    goal: "min-h-[400px] sm:min-h-[470px] lg:min-h-[500px]",
  };
  const modalType = {
    expense: (
      <AddExpense
        options={options}
        onAddExpense={onAdd}
        onExitModal={() => onModalAction(false, type)}
        openModalWarning={openModalWarning}
      />
    ),
    goal: (
      <AddGoal
        onAddGoal={onAdd}
        onExitModal={() => onModalAction(false, type)}
        openModalWarning={openModalWarning}
      />
    ),
  };

  return (
    <motion.div
      className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => onModalAction(false, type)}
    >
      <motion.div
        className={`${modalHeight[type]} min-w-[320px] w-[25%] bg-white border border-slate-200 rounded-2xl shadow`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between border-b border-slate-200 py-6 px-8">
          <Title size="lg" weight="medium">
            {type === "expense" && "Nova Transação"}
            {type === "goal" && "Nova Meta"}
          </Title>
          <X
            className="cursor-pointer"
            onClick={() => onModalAction(false, type)}
          />
        </div>

        <div>{modalType[type]}</div>
      </motion.div>
    </motion.div>
  );
}
