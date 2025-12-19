import InputText from "./elements/InputText";
import InputValue from "./elements/InputValue";
import InputOption from "./elements/InputOption";
import Button from "./elements/Button";
import { useState } from "react";
import { v4 } from "uuid";

function AddExpense({ options, onAddExpense, onExitModal }) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [isExpense, setIsExpense] = useState(false);

  const handleValueChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    setValue(numericValue);
  };

  const formattedValue = value
    ? (Number(value) / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    : "R$ 0,00";

  function handleAdd() {
    if (!description.trim() || !value.trim() || !type.trim()) {
      window.alert("É necessário que todos os campos estejam preenchidos!");
    } else {
      const newExpense = {
        id: v4(),
        description,
        value: Number(value) / 100,
        type,
        isExpense,
      };
      onAddExpense(newExpense);

      setDescription("");
      setValue("");
      setType("");
      setIsExpense(false);
    }
  }

  const onClickButton = () => {
    handleAdd();
    onExitModal();
  };

  return (
    <div className="flex flex-col gap-4 py-4 px-2">
      <InputText
        type="text"
        title="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <InputValue
        type="text"
        title="Value"
        value={formattedValue}
        onChange={handleValueChange}
      />

      <InputOption
        title="Expense Type"
        options={options}
        value={type}
        onChange={(e) => setType(e.target.value)}
      />

      <Button
        onClick={onClickButton}
        color={"bg-green-300"}
        hoverColor={"bg-green-500"}
      >
        Add expense +
      </Button>
    </div>
  );
}
export default AddExpense;
