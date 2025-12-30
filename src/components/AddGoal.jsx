import Button from "./elements/Button";
import ColorButton from "./elements/ColorButton";
import InputDate from "./elements/InputDate";
import InputValue from "./elements/InputValue";
import InputText from "./elements/InputText";
import TextWithIcon from "./elements/TextWithIcon";
import { useState } from "react";
import { v4 } from "uuid";
import { Plus } from "lucide-react";

export default function AddGoal({ onAddGoal, onExitModal, openModalWarning }) {
  const [targetValue, setTargetValue] = useState("");
  const [achievedValue, setAchievedValue] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("blue");
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const [targetDate, setTargetDate] = useState(tomorrow);

  const handleValueChange = (e, type) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    if (type === "target") {
      setTargetValue(numericValue);
    } else {
      setAchievedValue(numericValue);
    }
  };

  const formattedValue = (value, type) => {
    if (value) {
      return (Number(value) / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
    return type === "target" ? "R$ 10.000,00" : "R$ 0,00";
  };
  function handleAdd() {
    if (!description.trim() || !targetValue || !achievedValue) {
      openModalWarning("alert");
      return false;
    }
    const newGoal = {
      id: v4(),
      description,
      targetDate,
      targetValue,
      achievedValue,
      color,
      isFinished: targetValue === achievedValue,
    };
    onAddGoal(newGoal);

    setDescription("");
    setTargetValue("");
    setAchievedValue("");
    setColor("blue");
    setTargetDate(tomorrow);

    openModalWarning("success");
    return true;
  }

  const onClickButton = () => {
    const success = handleAdd();
    if (success) onExitModal();
  };

  return (
    <div className="flex flex-col gap-6 py-4 px-4 w-full">
      <div className="flex flex-col w-full justify-evenly gap-4">
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
              value={formattedValue(targetValue, "target")}
              onChange={(e) => handleValueChange(e, "target")}
            />
          </div>
          <div className="flex-1">
            <InputValue
              type="text"
              title="Valor"
              value={formattedValue(achievedValue, "achieved")}
              onChange={(e) => handleValueChange(e, "achieved")}
            />
          </div>
        </div>
        <InputDate
          title="Data"
          //   value={date}
          //   onChange={(e) => setDate(e.target.value)}
        />

        <div className="flex w-full justify-center gap-4">
          <Button color={"white"} onClick={onExitModal}>
            Cancelar
          </Button>
          <ColorButton onClick={onClickButton} color={color}>
            <TextWithIcon side="right" icon={Plus}>
              Criar Meta
            </TextWithIcon>
          </ColorButton>
        </div>
      </div>
    </div>
  );
}
