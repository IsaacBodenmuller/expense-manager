// import { useNavigate } from "react-router-dom";
import Button from "../components/elements/Button";
import GridTransacoes from "../components/GridTransacoes";
import Title from "../components/elements/Title";
import TextWithIcon from "../components/elements/TextWithIcon";
import { AnimatePresence } from "framer-motion";
import ModalNewExpense from "./modal/ModalNewExpense";
import ModalWarning from "./modal/ModalWarning";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

function Home() {
  const [expenses, setExpense] = useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  );
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

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

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
    <div className="flex flex-col relative py-8">
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

export default Home;
