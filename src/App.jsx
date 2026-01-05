import "./App.css";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import NavBar from "./pages/NavBar";
import ModalWarning from "./pages/modal/ModalWarning";
import GoalsPage from "./pages/GoalsPage";
import TransactionsPage from "./pages/TransactionsPage";
import ModalAdd from "./pages/modal/ModalAdd";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [warning, setWarning] = useState(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [showNewExpense, setShowNewExpense] = useState(false);
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [pages, setPages] = useState(["Home"]);
  const [editingGoal, setEditingGoal] = useState(null);

  const handleGoPage = (page) => {
    setCurrentPage(page);
    setIsOpenMenu(false);

    if (page === "home") {
      setPages(["Home"]);
    }

    if (page === "goals") {
      setPages(["Home", "Metas"]);
    }

    if (page === "transactions") {
      setPages(["Home", "Transações"]);
    }
  };

  const [goals, setGoal] = useState(
    JSON.parse(localStorage.getItem("goals")) || []
  );
  const [expenses, setExpense] = useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  );
  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  function addGoal(goal) {
    setGoal((prevGoals) => [...prevGoals, goal]);
  }
  function addExpense(expense) {
    setExpense((prevExpenses) => [...prevExpenses, expense]);
  }
  function updateGoal(id, addValue) {
    setGoal((prevGoals) =>
      prevGoals.map((goal) => {
        const achieved = Number(goal.achievedValue);
        const target = Number(goal.targetValue);
        const nextValue = achieved + addValue;

        return goal.id === id
          ? {
              ...goal,
              achievedValue: Math.min(nextValue, target),
              isFinished: nextValue >= target,
            }
          : goal;
      })
    );
  }
  function updateGoalFull(updatedGoal) {
    setGoal((prevGoals) =>
      prevGoals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal))
    );
  }
  function deleteGoal(id) {
    const newGoals = goals.filter((goal) => goal.id != id);
    setGoal(newGoals);
  }
  function finishGoal(id) {
    setGoal((prevGoals) =>
      prevGoals.map((goal) => {
        const target = Number(goal.targetValue);
        return goal.id === id
          ? {
              ...goal,
              achievedValue: target,
              isFinished: true,
            }
          : goal;
      })
    );
  }

  function handleModal(boolean, type) {
    if (type === "expense") setShowNewExpense(boolean);
    if (type === "goal") setShowNewGoal(boolean);
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
          <ModalAdd
            onAdd={addExpense}
            onModalAction={handleModal}
            openModalWarning={openModalWarning}
            options={options}
            type="expense"
          />
        )}
        {showNewGoal && (
          <ModalAdd
            onAdd={addGoal}
            onUpdate={updateGoalFull}
            onModalAction={handleModal}
            openModalWarning={openModalWarning}
            type="goal"
            editingGoal={editingGoal}
            setEditingGoal={setEditingGoal}
          />
        )}
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
              pages={pages}
              onGoPage={handleGoPage}
              onModalAction={handleModal}
            />
          )}
          {currentPage === "goals" && (
            <GoalsPage
              key="goals"
              pages={pages}
              goals={goals}
              onEditGoal={(goal) => {
                setEditingGoal(goal);
                setShowNewGoal(true);
              }}
              onFinishGoal={finishGoal}
              onDeleteGoal={deleteGoal}
              onUpdateGoal={updateGoal}
              onGoPage={handleGoPage}
              onModalAction={handleModal}
            />
          )}
          {currentPage === "transactions" && (
            <TransactionsPage
              key="transactions"
              pages={pages}
              expenses={expenses}
              onGoPage={handleGoPage}
              onModalAction={handleModal}
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpenMenu && (
          <Menu
            key="menu"
            currentPage={currentPage}
            onGoPage={handleGoPage}
            onClose={() => setIsOpenMenu(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
