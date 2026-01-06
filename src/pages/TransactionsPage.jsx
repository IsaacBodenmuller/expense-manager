import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import Title from "../components/elements/Title";
import TextWithIcon from "../components/elements/TextWithIcon";
import Button from "../components/elements/Button";
import InputSearch from "../components/elements/InputSearch";
import InputOption from "../components/elements/InputOption";

export default function TransactionPage({
  // expenses,
  options,
  pages,
  onGoPage,
  onModalAction,
}) {
  const [category, setCategory] = useState(0);
  const [type, setType] = useState(0);

  const [typeOptions] = useState([
    {
      id: 0,
      description: "Todos",
    },
    {
      id: 1,
      description: "Receitas",
    },
    {
      id: 2,
      description: "Despesas",
    },
  ]);

  const categoryOptions = options.some((opt) => opt.id === 0)
    ? options
    : [
        { id: 0, icon: "", description: "Todas as categorias", isOther: true },
        ...options,
      ];

  const filteredCategoryOptions = categoryOptions.filter((option) => {
    if (option.id === 0 || option.isOther) return true;
    if (type === 1) return option.isExpense === false;
    if (type === 2) return option.isExpense === true;
    return true;
  });

  useEffect(() => {
    if (!filteredCategoryOptions.some((opt) => opt.id === category)) {
      setCategory(0);
    }
  }, [type, filteredCategoryOptions, category]);

  return (
    <div className="flex flex-col h-full pr-4 relative py-4 pt-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 overflow-y-auto gap-8">
      <div>
        <div className={`text-sm text-slate-500 cursor-pointer`}>
          {pages.map((page, index) => (
            <span
              onClick={() => {
                if (page === "Home") onGoPage("home");
              }}
              key={page}
              className={`${
                index === pages.length - 1
                  ? "underline font-medium cursor-default"
                  : ""
              }`}
            >
              {page}
              {index < pages.length - 1 && " > "}
            </span>
          ))}
        </div>

        <div className="flex flex-col justify-center gap-8 pt-4">
          <div className="flex flex-col gap-2">
            <div>
              <Title size="xl" weight="medium" position="start">
                Home
              </Title>
              <span className="text-slate-500 text-base">
                Visão geral das suas finanças
              </span>
            </div>
            <Button
              onClick={() => onModalAction(true, "expense")}
              color="darkGray"
            >
              <TextWithIcon iconSize="4" side="left" icon={Plus}>
                Nova Transação
              </TextWithIcon>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col border border-slate-200 w-full h-50 rounded-xl shadow-sm p-4 gap-4 justify-center">
        <InputSearch placeholder="Buscar transações..." />
        <InputOption
          options={typeOptions}
          value={type}
          onChange={(id) => setType(id)}
          isTitle={false}
        />
        <InputOption
          options={filteredCategoryOptions}
          value={category}
          onChange={(id) => setCategory(id)}
          isTitle={false}
        />
      </div>
    </div>
  );
}
