import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import NavBar from "./pages/NavBar";
import ModalWarning from "./pages/modal/ModalWarning";
import { useState } from "react";
import "./App.css";
import GoalsPage from "./pages/GoalsPage";
import TransactionsPage from "./pages/TransactionsPage";
import ModalNewExpense from "./pages/modal/ModalNewExpense";
import ModalNewGoal from "./pages/modal/ModalNewGoal";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [warning, setWarning] = useState(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [showNewExpense, setShowNewExpense] = useState(false);
  const [showNewGoal, setShowNewGoal] = useState(false);

  const goPage = (page) => {
    setCurrentPage(page);
    setIsOpenMenu(false);
  };

  const [goals, setGoal] = useState(
    JSON.parse(localStorage.getItem("goals")) || []
  );
  const [expenses, setExpense] = useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  );

  function addGoal(goal) {
    setGoal((prev) => [...prev, goal]);
  }
  function addExpense(expense) {
    setExpense((prev) => [...prev, expense]);
  }
  function handleModal(boolean, type) {
    if (type === "newExpense") setShowNewExpense(boolean);
    if (type === "newGoal") setShowNewGoal(boolean);
  }

  const [options] = useState([
    {
      id: 1,
      icon: "💵",
      description: "Salário",
      isExpense: false,
    },
    {
      id: 2,
      icon: "💼",
      description: "Freelance",
      isExpense: false,
    },
    {
      id: 3,
      icon: "📈",
      description: "Investimento",
      isOther: true,
    },
    {
      id: 4,
      icon: "🍔",
      description: "Alimentação",
      isExpense: true,
    },
    {
      id: 5,
      icon: "🚗",
      description: "Transporte",
      isExpense: true,
    },
    {
      id: 6,
      icon: "🏠",
      description: "Moradia",
      isExpense: true,
    },
    {
      id: 7,
      icon: "💡",
      description: "Contas",
      isExpense: true,
    },
    {
      id: 8,
      icon: "🕹",
      description: "Lazer",
      isExpense: true,
    },
    {
      id: 9,
      icon: "💊",
      description: "Saúde",
      isExpense: true,
    },
    {
      id: 10,
      icon: "📚",
      description: "Educação",
      isExpense: true,
    },
    {
      id: 11,
      icon: "💳",
      description: "Compras",
      isExpense: true,
    },
    {
      id: 12,
      icon: "✈",
      description: "Viagem",
      isExpense: true,
    },
    {
      id: 13,
      icon: "📌",
      description: "Outros",
      isOther: true,
    },
  ]);

  const handleOpenMenu = () => {
    setIsOpenMenu(true);
  };

  function openModalWarning(type) {
    setWarning(type);
    setTimeout(() => {
      setWarning(null);
    }, 2000);
  }

  return (
    <div className="w-full h-screen overflow-hidden">
      <AnimatePresence>
        {warning && (
          <ModalWarning
            key={warning}
            onExitModal={() => setWarning(null)}
            type={warning}
            text={
              warning === "success"
                ? "Operação realizada com sucesso!"
                : warning === "error"
                ? "Parece que ocorreu um erro! Tente novamente."
                : "É necessário preencher todos os campos!"
            }
          />
        )}
        {showNewExpense && (
          <ModalNewExpense
            onAddExpense={addExpense}
            onModalAction={handleModal}
            openModalWarning={openModalWarning}
            options={options}
          />
        )}
        {showNewGoal && <ModalNewGoal />}
      </AnimatePresence>

      <NavBar onOpenMenu={handleOpenMenu} />
      <div className="pl-4 pt-14 overflow-hidden h-full">
        <AnimatePresence mode="wait">
          {currentPage === "home" && (
            <Home
              key="home"
              expenses={expenses}
              goals={goals}
              options={options}
              onGoPage={goPage}
              onModalAction={handleModal}
            />
          )}
          {currentPage === "goals" && (
            <GoalsPage key="goals" onGoPage={goPage} onAddGoal={addGoal} />
          )}
          {currentPage === "transactions" && (
            <TransactionsPage
              key="transactions"
              onGoPage={goPage}
              onAddExpense={addExpense}
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpenMenu && (
          <Menu
            key="menu"
            currentPage={currentPage}
            onGoPage={goPage}
            onClose={() => setIsOpenMenu(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
