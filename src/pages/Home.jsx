// import { useNavigate } from "react-router-dom";
import Button from "../components/elements/Button";
import GridTransacoes from "../components/GridTransacoes";
import LinearGraphic from "../components/LinearGraphic";
import CategoryGraphic from "../components/CategoryGraphic";
import Title from "../components/elements/Title";
import TextWithIcon from "../components/elements/TextWithIcon";
import { AnimatePresence } from "framer-motion";
import ModalNewExpense from "./modal/ModalNewExpense";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import GridCards from "../components/GridCards";

export default function Home({ onOpenModalWarning, options }) {
  const [showNewExpense, setShowNewExpense] = useState(false);
  const [expenses, setExpense] = useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  );

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  function addExpense(expense) {
    setExpense((prev) => [...prev, expense]);
  }
  function handleExitModal() {
    setShowNewExpense(false);
  }
  // const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full pr-4 relative py-8 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 overflow-y-auto">
      {/* Modals */}
      <AnimatePresence className>
        {showNewExpense && (
          <ModalNewExpense
            onAddExpense={addExpense}
            onExitModal={handleExitModal}
            openModalWarning={onOpenModalWarning}
            options={options}
          />
        )}
      </AnimatePresence>
      {/* ------ */}

      <div className="flex flex-col justify-center gap-8">
        <div className="flex flex-col gap-2">
          <div>
            <Title size="xl" weight="medium" position="start">
              Dashboard
            </Title>
            <span className="text-slate-500 text-base">
              Visão geral das suas finanças
            </span>
          </div>
          <Button onClick={() => setShowNewExpense(true)} color="darkGray">
            <TextWithIcon iconSize="4" side="left" icon={Plus}>
              Nova Transação
            </TextWithIcon>
          </Button>
        </div>
        <GridCards expenses={expenses}></GridCards>
        <LinearGraphic></LinearGraphic>
        <CategoryGraphic
          expenses={expenses}
          options={options}
        ></CategoryGraphic>
        <GridTransacoes
          expenses={expenses}
          title="Transações Recentes"
          options={options}
          className="shadow-md"
        ></GridTransacoes>
      </div>
    </div>
  );
}
