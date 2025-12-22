// import { useNavigate } from "react-router-dom";
// import AddExpense from "../components/AddExpense";
import Grid from "../components/Grid";
import { AnimatePresence } from "framer-motion";
import Title from "../components/elements/Title";
import ModalNewExpense from "./modal/ModalNewExpense";
import { useEffect, useState } from "react";
import ModalWarning from "./modal/ModalWarning";

function Home() {
  const [expenses, setExpense] = useState([]);
  const [showNewExpense, setShowNewExpense] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
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
      isExpense: false,
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

  useEffect(() => {}, []);

  function openModalWarning(type) {
    if (type === "success") {
      setShowSuccess(true);
    } else if (type === "error") {
      setShowError(true);
    } else if (type === "alert") {
      setShowAlert(true);
    }
    setTimeout(() => {
      setShowSuccess(false);
      setShowError(false);
      setShowAlert(false);
    }, 2000);
  }

  function exitModal(type) {
    if (type === "warning") {
      setShowSuccess(false);
      setShowError(false);
      setShowAlert(false);
    } else setShowNewExpense(false);
  }
  function addExpense(expense) {
    setExpense((prev) => [...prev, expense]);
  }
  // const navigate = useNavigate();

  return (
    <div className="flex flex-col relative">
      {/* Modals */}

      <AnimatePresence className>
        {showNewExpense && (
          <ModalNewExpense
            onAddExpense={addExpense}
            onExitModal={exitModal}
            openModalWarning={openModalWarning}
            options={options}
          />
        )}
        {showSuccess && (
          <ModalWarning
            key={Date.now()}
            onExitModal={exitModal}
            type="success"
            text="Operação realizada com sucesso!"
          />
        )}
        {showError && (
          <ModalWarning
            key={Date.now()}
            onExitModal={exitModal}
            type="error"
            text="Parece que ocorreu um erro! Tente novamente."
          />
        )}
        {showAlert && (
          <ModalWarning
            key={Date.now()}
            onExitModal={exitModal}
            type="alert"
            text="É necessário preencher todos os campos!"
          />
        )}
      </AnimatePresence>
      <Title onClick={() => setShowNewExpense(true)}>Gerenciar despesas</Title>

      {/* ------ */}

      {/* <AddExpense options={options} onAddExpense={addExpense}></AddExpense> */}
      <Grid
        expenses={expenses}
        title="Transações Recentes"
        options={options}
      ></Grid>
    </div>
  );
}

export default Home;
