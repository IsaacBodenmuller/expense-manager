import {
  Plus,
  Ellipsis,
  Calendar,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import Title from "../components/elements/Title";
import TextWithIcon from "../components/elements/TextWithIcon";
import Button from "../components/elements/Button";
import InputSearch from "../components/elements/InputSearch";
import InputOption from "../components/elements/InputOption";
import ExpenseOptions from "../components/elements/ExpenseOptions";
import invesmentImage from "../assets/investment.png";

export default function TransactionPage({
  expenses,
  options,
  pages,
  onDeleteExpense,
  onGoPage,
  onModalAction,
  onEditExpense,
}) {
  const [openedExpenseId, setOpenedExpenseId] = useState(null);
  const [category, setCategory] = useState(0);
  const [type, setType] = useState(0);
  const [textInput, setTextInput] = useState("");

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

  const optionDescription = (type) => {
    const option = options.find((option) => option.id === type);
    return option?.description || "";
  };

  const disabled = expenses.length === 0;
  const filteredExpenses = expenses.filter((expense) => {
    if (type === 1 && expense.isExpense) return false;
    if (type === 2 && !expense.isExpense) return false;

    if (category !== 0 && expense.type !== category) return false;

    if (textInput && textInput.trim() !== "") {
      const search = textInput.toLowerCase();

      const descriptionMatch = expense.description
        .toLowerCase()
        .includes(search);

      const categoryMatch = optionDescription(expense.type)
        .toLowerCase()
        .includes(search);

      if (!descriptionMatch && !categoryMatch) return false;
    }

    return true;
  });
  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const formattedDate = (date) => {
    const [year, month, day] = date.split("-").map(Number);
    const dateNotFormatted = new Date(date);
    const dayName = dateNotFormatted.toLocaleDateString("pt-BR", {
      weekday: "long",
    });
    const monthNames = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];
    return `${dayName}, ${day} ${monthNames[month - 1]} de ${year}`;
  };

  const expensesGroupedByDate = sortedExpenses.reduce((acc, expense) => {
    if (!acc[expense.date]) {
      acc[expense.date] = [];
    }
    acc[expense.date].push(expense);
    return acc;
  }, {});

  const expenseIcon = (type) => {
    const option = options.find((option) => option.id === type);
    return option?.icon || null;
  };

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
        <InputSearch
          placeholder="Buscar transações..."
          onChange={(e) => setTextInput(e.target.value)}
        />
        <InputOption
          disabled={disabled}
          options={typeOptions}
          value={type}
          onChange={(id) => setType(id)}
          isTitle={false}
        />
        <InputOption
          disabled={disabled}
          options={filteredCategoryOptions}
          value={category}
          onChange={(id) => setCategory(id)}
          isTitle={false}
        />
      </div>
      {sortedExpenses.length ? (
        <div className="w-full flex flex-col gap-4">
          {Object.entries(expensesGroupedByDate).map(
            ([date, expensesOfDay]) => (
              <div key={date} className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <Calendar className="text-gray-400 size-4 self-center" />
                  <span className="text-sm text-slate-500">
                    {formattedDate(date)}
                  </span>
                </div>

                <div className="flex flex-col border rounded-lg shadow-md">
                  {expensesOfDay.map((expense, index) => (
                    <div
                      className={`flex h-20 p-2 justify-between ${
                        index != expensesOfDay.length - 1
                          ? "border-b border-slate-200"
                          : ""
                      }`}
                      key={expense.id}
                    >
                      <div className="flex gap-3 self-center min-w-40">
                        <div className="bg-slate-100 rounded-xl size-12 content-center text-center">
                          {expenseIcon(expense.type)}
                        </div>
                        <div className="flex flex-col justify-between min-w-0">
                          <span className="text-sm text-ellipsis text-nowrap overflow-hidden">
                            {expense.description}
                          </span>
                          <div className="bg-gray-100 px-2 rounded-md text-[13px] text-center font-medium w-fit">
                            {optionDescription(expense.type)}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end w-fit gap-3 items-center">
                        <div className="self-center">
                          {expense.isExpense ? (
                            <TextWithIcon
                              iconSize="5"
                              side="left"
                              icon={ArrowDownRight}
                              color="text-red-500"
                            >
                              {expense.value.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </TextWithIcon>
                          ) : (
                            <TextWithIcon
                              iconSize="5"
                              side="left"
                              icon={ArrowUpRight}
                              color="text-green-500"
                            >
                              {expense.value.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </TextWithIcon>
                          )}
                        </div>
                        <div
                          key={expense.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenedExpenseId(
                              openedExpenseId === expense.id ? null : expense.id
                            );
                          }}
                          className="content-center justify-items-center cursor-pointer h-8 w-8 hover:bg-slate-100 rounded-md"
                        >
                          <Ellipsis className="size-4 self-center" />
                          {openedExpenseId === expense.id && (
                            <ExpenseOptions
                              expense={expense}
                              onDeleteExpense={onDeleteExpense}
                              onEditExpense={onEditExpense}
                              onClose={() => setOpenedExpenseId(null)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <img
            src={invesmentImage}
            alt="Target image"
            className="size-16 self-center"
          />
          <span className="self-center text-lg font-medium">
            Nenhuma transação definida
          </span>
          <span className="self-center text-base font-normal text-slate-500">
            Crie sua primeira transação financeira
          </span>
          <div
            onClick={() => onModalAction(true, "expense")}
            className="flex self-center justify-evenly items-center rounded-md bg-purple-600 text-white text-sm px-2 w-36 h-8 cursor-pointer"
          >
            <Plus />
            <button type="button">Criar Transação</button>
          </div>
        </div>
      )}
    </div>
  );
}
