import Title from "../../components/elements/Title";
import AddExpense from "../../components/AddExpense";
import { X } from "lucide-react";
import { motion } from "framer-motion";

function ModalNewExpense({ onAddExpense, onExitModal, options }) {
  return (
    <motion.div
      className="fixed inset-0 flex justify-center items-center bg-black/40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onExitModal}
    >
      <motion.div
        className="w-[90%] h-[90%] bg-white border border-slate-200 rounded-md shadow"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between border-b border-slate-200 py-8 px-8">
          <Title>Nova Transação</Title>
          <X className="cursor-pointer" onClick={onExitModal} />
        </div>

        <div>
          <AddExpense
            options={options}
            onAddExpense={onAddExpense}
            onExitModal={onExitModal}
          ></AddExpense>
        </div>
      </motion.div>
    </motion.div>
  );
}
export default ModalNewExpense;
