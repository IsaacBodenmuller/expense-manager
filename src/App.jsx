import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import NavBar from "./pages/NavBar";
import ModalWarning from "./pages/modal/ModalWarning";
import { useState } from "react";

function App() {
  const [warning, setWarning] = useState(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

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
      {/* Modal Warning */}
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
      </AnimatePresence>

      <NavBar onOpenMenu={handleOpenMenu} />

      <div className="pl-4 pt-14 overflow-hidden h-full">
        <Home options={options} onOpenModalWarning={openModalWarning} />
      </div>

      <AnimatePresence>
        {isOpenMenu && <Menu key="menu" onClose={() => setIsOpenMenu(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
