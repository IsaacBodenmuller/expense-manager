// import { useNavigate } from "react-router-dom";
import AddExpense from "../components/AddExpense";
import Grid from "../components/Grid";
import Title from "../components/elements/Title";
import { useEffect, useState } from "react";

function Home() {
  const [expenses, setExpense] = useState([]);
  const [options] = useState([
    {
      id: 1,
      description: "Fixed Expense",
      color: "bg-sky-500",
    },
    {
      id: 2,
      description: "Leisure",
      color: "bg-purple-500",
    },
    {
      id: 3,
      description: "Investment",
      color: "bg-lime-600",
    },
    {
      id: 4,
      description: "Food",
      color: "bg-yellow-300",
    },
    {
      id: 5,
      description: "Emergency",
      color: "bg-red-500",
    },
    {
      id: 6,
      description: "Random",
      color: "bg-orange-300",
    },
  ]);

  useEffect(() => {}, []);

  function addExpense(expense) {
    setExpense((prev) => [...prev, expense]);
  }

  // const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <Title>Expense Manager</Title>
      <AddExpense options={options} onAddExpense={addExpense}></AddExpense>
      <Grid expenses={expenses} title="Expenses" options={options}></Grid>
    </div>
  );
}

export default Home;
