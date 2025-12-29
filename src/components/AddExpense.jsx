import InputText from "./elements/InputText";
import InputValue from "./elements/InputValue";
import InputOption from "./elements/InputOption";
import InputDate from "./elements/InputDate";
import Button from "./elements/Button";
import ColorButton from "./elements/ColorButton";
import { useState } from "react";
import { v4 } from "uuid";
import TextWithIcon from "./elements/TextWithIcon";
import { ArrowUpRight, ArrowDownRight, Plus } from "lucide-react";

export default function AddExpense({
  options,
  onAddExpense,
  onExitModal,
  openModalWarning,
}) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [isExpense, setIsExpense] = useState(true);
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [note, setNote] = useState("");

  const filteredOptions = options.filter((option) => {
    if (option.isOther) return true;
    return option.isExpense === isExpense;
  });

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
    if (!description.trim() || !value || !type) {
      openModalWarning("alert");
      return false;
    }
    const newExpense = {
      id: v4(),
      description,
      value: Number(value) / 100,
      type,
      isExpense,
      date,
      note,
    };
    onAddExpense(newExpense);

    setDescription("");
    setValue("");
    setType("");
    setIsExpense(false);
    setDate(today);

    openModalWarning("success");
    return true;
  }

  const onClickButton = () => {
    const success = handleAdd();
    if (success) onExitModal();
  };

  return (
    <div className="flex flex-col gap-6 py-4 px-4 w-full">
      <div className="flex w-full justify-evenly gap-4">
        {!isExpense && (
          <>
            <ColorButton
              color={"green"}
              direction={"up"}
              onClick={() => setIsExpense(false)}
            >
              <TextWithIcon iconSize="5" side="left" icon={ArrowUpRight}>
                Receita
              </TextWithIcon>
            </ColorButton>
            <ColorButton
              color={"gray"}
              direction={"down"}
              onClick={() => setIsExpense(true)}
            >
              <TextWithIcon iconSize="5" side="left" icon={ArrowDownRight}>
                Despesa
              </TextWithIcon>
            </ColorButton>
          </>
        )}
        {isExpense && (
          <>
            <ColorButton
              color={"gray"}
              direction={"up"}
              onClick={() => setIsExpense(false)}
            >
              <TextWithIcon iconSize="5" side="left" icon={ArrowUpRight}>
                Receita
              </TextWithIcon>
            </ColorButton>
            <ColorButton
              color={"red"}
              direction={"down"}
              onClick={() => setIsExpense(true)}
            >
              <TextWithIcon iconSize="5" side="left" icon={ArrowDownRight}>
                Despesa
              </TextWithIcon>
            </ColorButton>
          </>
        )}
      </div>

      <InputOption
        title="Categoria"
        options={filteredOptions}
        value={type}
        onChange={(id) => setType(id)}
      />
      <InputText
        type="text"
        title="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Ex: Compra no mercado"
      />

      <div className="flex gap-6 flex-col md:flex-col lg:flex-col xl:flex-col 2xl:flex-row w-full ">
        <div className="flex-1">
          <InputValue
            type="text"
            title="Valor"
            value={formattedValue}
            onChange={handleValueChange}
          />
        </div>
        <div className="flex-1">
          <InputDate
            title="Data"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <InputText
        title="Notas (Opcional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="flex w-full justify-center gap-4">
        <Button color={"white"} onClick={onExitModal}>
          Cancelar
        </Button>
        {isExpense && (
          <ColorButton onClick={onClickButton} color={"red"}>
            <TextWithIcon side="right" icon={Plus}>
              Adicionar
            </TextWithIcon>
          </ColorButton>
        )}
        {!isExpense && (
          <ColorButton onClick={onClickButton} color={"green"}>
            <TextWithIcon side="right" icon={Plus}>
              Adicionar
            </TextWithIcon>
          </ColorButton>
        )}
      </div>
    </div>
  );
}
