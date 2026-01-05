import Button from "./elements/Button";
import ColorButton from "./elements/ColorButton";
import InputDate from "./elements/InputDate";
import InputValue from "./elements/InputValue";
import InputText from "./elements/InputText";
import TextWithIcon from "./elements/TextWithIcon";
import ColorCircle from "./elements/ColorCircle";
import { useState, useEffect } from "react";
import { v4 } from "uuid";

export default function AddGoal({
  onAddGoal,
  editingGoal,
  onUpdate,
  onExitModal,
  openModalWarning,
}) {
  const [targetValue, setTargetValue] = useState("1000000");
  const [achievedValue, setAchievedValue] = useState("0");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("blue");
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dateFixed = tomorrow.toISOString().split("T")[0];
  const [targetDate, setTargetDate] = useState(dateFixed);

  useEffect(() => {
    if (editingGoal) {
      setDescription(editingGoal.description);
      setTargetValue(editingGoal.targetValue);
      setAchievedValue(editingGoal.achievedValue);
      setColor(editingGoal.color);
      setTargetDate(editingGoal.targetDate);
    }
  }, [editingGoal]);

  const circleColors = ["blue", "green", "purple", "orange", "pink"];

  const handleValueChange = (e, type) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    if (type === "target") {
      setTargetValue(numericValue);
    } else {
      setAchievedValue(numericValue);
    }
  };

  const formattedValue = (value) => {
    return (Number(value) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  function handleSubmit() {
    if (!description.trim() || Number(targetValue) === 0) {
      openModalWarning("alert");
      return false;
    }
    // else if (Number(achievedValue) > Number(targetValue)) {
    //   openModalWarning("alert");
    //   return false;
    // }
    const goalData = {
      id: editingGoal ? editingGoal.id : v4(),
      description,
      targetDate,
      targetValue: Number(targetValue),
      achievedValue: Number(achievedValue),
      color,
      isFinished: Number(achievedValue) >= Number(targetValue),
    };
    if (editingGoal) {
      onUpdate(goalData);
    } else {
      onAddGoal(goalData);
    }

    setDescription("");
    setTargetValue("1000000");
    setAchievedValue("0");
    setColor("blue");
    setTargetDate(dateFixed);

    openModalWarning("success");
    return true;
  }

  const onClickButton = () => {
    const success = handleSubmit();
    if (success) onExitModal();
  };

  return (
    <div className="flex flex-col py-6 px-4 w-full">
      <div className="flex flex-col w-full justify-evenly gap-8">
        <InputText
          type="text"
          title="Nome da Meta"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex: Viagem para Europa"
        />

        <div className="flex gap-6 md:flex-col lg:flex-col xl:flex-col 2xl:flex-row w-full ">
          <div className="flex-1">
            <InputValue
              type="text"
              title="Valor Alvo"
              value={formattedValue(targetValue)}
              onChange={(e) => handleValueChange(e, "target")}
              placeholder="aa"
            />
          </div>
          <div className="flex-1">
            <InputValue
              type="text"
              title="Valor Atual"
              value={formattedValue(achievedValue)}
              onChange={(e) => handleValueChange(e, "achieved")}
            />
          </div>
        </div>
        <InputDate
          title="Prazo"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
        />

        <div className="flex">
          {circleColors.map((type) => (
            <ColorCircle
              key={type}
              color={type}
              isSelected={color === type}
              onClick={() => setColor(type)}
            />
          ))}
        </div>

        <div className="flex w-full justify-center gap-4">
          <Button color={"white"} onClick={onExitModal}>
            Cancelar
          </Button>
          <ColorButton onClick={onClickButton} color={color}>
            <TextWithIcon>
              {editingGoal ? "Salvar Alterações" : "Criar Meta"}
            </TextWithIcon>
          </ColorButton>
        </div>
      </div>
    </div>
  );
}
