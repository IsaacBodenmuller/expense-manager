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
  const [showModal, setShowModal] = useState(false);
  const [options] = useState([
    {
      id: 1,
      description: "Salário",
    },
    {
      id: 2,
      description: "Freelance",
    },
    {
      id: 3,
      description: "Investimento",
    },
    {
      id: 4,
      description: "Alimentação",
    },
    {
      id: 5,
      description: "Transporte",
    },
    {
      id: 6,
      description: "Moradia",
    },
    {
      id: 7,
      description: "Contas",
    },
    {
      id: 8,
      description: "Lazer",
    },
    {
      id: 9,
      description: "Saúde",
    },
    {
      id: 10,
      description: "Educação",
    },
    {
      id: 11,
      description: "Compras",
    },
    {
      id: 12,
      description: "Viagem",
    },
    {
      id: 13,
      description: "Outros",
    },
  ]);

  useEffect(() => {}, []);

  function exitModal() {
    setShowModal(false);
  }
  function addExpense(expense) {
    setExpense((prev) => [...prev, expense]);
  }
  // const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Modals */}

      <AnimatePresence>
        {showModal && (
          <ModalNewExpense
            onAddExpense={addExpense}
            onExitModal={exitModal}
            options={options}
          />
        )}
        <ModalWarning onExitModal={exitModal} type="success" />
      </AnimatePresence>
      <Title onClick={() => setShowModal(true)}>Gerenciar despesas</Title>

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
